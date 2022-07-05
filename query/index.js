import fs from "fs"
import { parse } from "../peg/parse"
import { Temporal } from "@js-temporal/polyfill";

function postByID() {
    const postByID = {};
    const markdowns = fs.readdirSync("notes")
    for (const name of markdowns) {
        const post = parse(fs.readFileSync(`notes/${name}`).toString())
        const id = name.replace(/\.md$/, '')
        postByID[id] = { ...post, id, timestamp: Temporal.ZonedDateTime.from(post.published_at).epochSeconds }
    }
    return postByID
}

export function getPost(id) {
    return postByID()[id]
}

export function getAllPosts() {
    return Object.entries(postByID()).map(([k, v]) => v)
}
