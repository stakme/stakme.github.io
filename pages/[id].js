import Link from "next/link"
import { getPost, getAllPosts } from '../query'

function Blog({ post }) {
    return (
        <>
            <Link href="/">top</Link>
            <article>
                <p style={{ marginBottom: '1em', color: 'gray' }}>{post.published_at}</p>
                {post.content.map(line => <div key={line}>{line}<br /></div>)}
            </article>
        </>
    )
}

export async function getStaticProps(ctx) {
    const post = getPost(ctx.params.id)
    return {
        props: {
            key: ctx.params.id,
            post: post,
        },
    }
}

export async function getStaticPaths() {
    const posts = getAllPosts();
    const paths = posts.map(post => ({ params: { id: post.id } }))
    return {
        paths, fallback: false
    }
}

export default Blog
