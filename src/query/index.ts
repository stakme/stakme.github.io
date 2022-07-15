import fs from "fs";
import { parse } from "./parse";
import { Temporal } from "@js-temporal/polyfill";
import { convertList, convertParagraph } from "./convert";
import { ImageLinePart, Paragraph, Post, PostID } from "./type";
import { getOGImagePath } from "../utils/og_image";
import { getImageDetail } from "../utils/image";

type PostObject = { [key: PostID]: Post };

async function postByID(): Promise<PostObject> {
    const postByID: PostObject = {};
    const markdowns = fs.readdirSync("notes");
    for (const name of markdowns) {
        try {
            const post = parse(fs.readFileSync(`notes/${name}`).toString());
            if (post.draft) {
                continue;
            }

            // TODO: コードが汚くてびっくりしちゃった
            const id = name.replace(/\.md$/, "");
            const paragraphs: Paragraph[] = [];
            const contents = post.contents.map((content) => {
                if (content.type === "list") {
                    return convertList(id, content);
                }
                if (content.type === "paragraph") {
                    const paragraph = convertParagraph(id, content);
                    paragraphs.push(paragraph);
                    return paragraph;
                }

                return content;
            });
            const featuredImagePath = paragraphs
                .flatMap((p) => p.lines)
                .flat()
                .filter(
                    (l): l is ImageLinePart => l.type === "image" && l.featured
                )
                .map((i) => i.src)[0];
            const ogTitle = post.og_title ?? post.title;
            const ogImagePath =
                featuredImagePath || (await getOGImagePath(id, ogTitle));
            postByID[id] = {
                ...post,
                id,
                timestamp: Temporal.ZonedDateTime.from(post.published_at)
                    .epochSeconds,
                og_title: ogTitle,
                og_image: getImageDetail(ogImagePath),
                card_type: featuredImagePath ? "image" : "text",
                contents,
            };
        } catch (e) {
            console.error(name, e);
            process.exit(1);
        }
    }
    return postByID;
}

export async function getPost(id: PostID): Promise<Post> {
    return (await postByID())[id];
}

export async function getAllPosts(): Promise<Post[]> {
    return Object.entries(await postByID()).map(([k, v]) => v);
}

export type { Post, PostID, Content, Line } from "./type";
