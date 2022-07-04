import fs from "fs"
import { parse } from "../peg/parse"

const postByID = {};

(function () {
    const markdowns = fs.readdirSync("notes")
    for (const name of markdowns) {
        const post = fs.readFileSync(`notes/${name}`).toString()
        const id = name.replace(/\.md$/, '')
        postByID[id] = { id, ...parse(post) }
    }
})()

export function getPost(id) {
    return postByID[id]
}

export function getAllPosts() {
    return Object.entries(postByID).map(([k, v]) => v)
}
