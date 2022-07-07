import fs from "fs";
import { parse } from "./parse";
import { Temporal } from "@js-temporal/polyfill";

export type PostID = string;
export interface Post {
    id: PostID;
    summary: string;
    tags: string;
    published_at: string;
    content: string[];
    timestamp: number;
}
type PostObject = { [key: PostID]: Post };

function postByID(): PostObject {
    const postByID: PostObject = {};
    const markdowns = fs.readdirSync("notes");
    for (const name of markdowns) {
        try {
            const post = parse(fs.readFileSync(`notes/${name}`).toString());
            const id = name.replace(/\.md$/, "");
            postByID[id] = {
                ...post,
                id,
                timestamp: Temporal.ZonedDateTime.from(post.published_at)
                .epochSeconds,
            };
        } catch (e) {
            console.error(name, e)
            process.exit(1)
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
