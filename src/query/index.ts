import fs from "fs";
import { parse } from "./parse";
import { Temporal } from "@js-temporal/polyfill";
import { convertList } from "./convert";
import { Post, PostID } from "./type";

type PostObject = { [key: PostID]: Post };

function postByID(): PostObject {
    const postByID: PostObject = {};
    const markdowns = fs.readdirSync("notes");
    for (const name of markdowns) {
        try {
            const post = parse(fs.readFileSync(`notes/${name}`).toString());
            if (post.draft) {
                continue;
            }

            const id = name.replace(/\.md$/, "");
            postByID[id] = {
                ...post,
                id,
                timestamp: Temporal.ZonedDateTime.from(post.published_at)
                    .epochSeconds,
                contents: post.contents.map((content) => {
                    if (content.type === "list") {
                        return convertList(content);
                    }
                    return content;
                }),
            };
        } catch (e) {
            console.error(name, e);
            process.exit(1);
        }
    }
    return postByID;
}

export function getPost(id: PostID) {
    return postByID()[id];
}

export function getAllPosts() {
    return Object.entries(postByID()).map(([k, v]) => v);
}

export type { Post, PostID, Content } from "./type";
export type { Line } from "./parse";
