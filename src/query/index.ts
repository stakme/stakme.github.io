import fs from "fs";
import { parse } from "./parse";
import { Temporal } from "@js-temporal/polyfill";
import { convertImage, convertList } from "./convert";
import { Post, PostID } from "./type";
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

            const id = name.replace(/\.md$/, "");
            let featuredImagePath = "";
            const contents = post.contents.map((content) => {
                if (content.type === "list") {
                    return convertList(content);
                }
                if (content.type === "image") {
                    const img = convertImage(id, content);
                    if (!featuredImagePath && img.featured) {
                        featuredImagePath = img.src;
                    }
                    return img;
                }
                return content;
            });
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

export type { Post, PostID, Content } from "./type";
export type { MDLine as Line } from "./parse";
