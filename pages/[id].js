import fs from "fs"
import parser from "../peg/parse"

function Blog({ post }) {
    return (
        <>
            {post.map(line => <>{line}<br /></>
            )}
        </>
    )
}

export async function getStaticProps(ctx) {
    const post = fs.readFileSync(`notes/${ctx.params.id}.md`).toString()

    return {
        props: {
            post: parser.parse(post),
        },
    }
}

export async function getStaticPaths() {
    const notes = fs.readdirSync("notes")
    const paths = notes.map(n => ({ params: { id: n.replace(/\.md$/, '') } }))
    return {
        paths, fallback: false
    }
}

export default Blog
