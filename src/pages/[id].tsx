import Head from 'next/head'
import { FC } from "react"
import { GetStaticProps, GetStaticPaths } from 'next'
import { getPost, getAllPosts, Post, PostID } from '../query'
import { TextLink } from "../components/link"

const Blog: FC<{ post: Post }> = ({ post }) => {
    return (
        <main className="m-8">
            <Head>
                <title >大丈夫になりたい | {post.summary}</title>
            </Head>

            <TextLink href="/">top</TextLink>
            <article>
                <p style={{ marginBottom: '1em', color: 'gray' }}>{post.published_at}</p>
                {post.content.map(line => <div key={line}>{line}<br /></div>)}
            </article>
        </main>
    )
}

export const getStaticProps: GetStaticProps<{ id: string }> = async (ctx) => {
    const postID = ctx.params!.id as PostID
    const post = getPost(postID)
    return {
        props: {
            id: postID,
            post: post,
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = getAllPosts();
    const paths = posts.map(post => ({ params: { id: post.id } }))
    return {
        paths, fallback: false
    }
}

export default Blog
