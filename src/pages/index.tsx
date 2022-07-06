import { FC } from "react"
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getAllPosts, Post } from '../query'

const page: FC<{ posts: Post[] }> = ({ posts }) => {
    return (
        <div className="container">
            <Head>
                <title >@stakme | 大丈夫になりたい</title>
            </Head>

            <main className="m-8">
                <h1 className="text-xl font-bold ">
                    @stakme
                </h1>
                <h2>
                    大丈夫になりたい
                </h2>
                <ul className="mt-8">
                    {posts.map(p =>
                        <li key={p.id} className="mt-2">
                            <Link href={`/${encodeURIComponent(p.id)}`}><a className="text-sky-400 hover:text-sky-500 focus:text-sky-700 visited:text-sky-900">[{p.published_at}] {p.id}<br />{p.summary}</a></Link>
                        </li>)}
                </ul>
            </main>
        </div>
    )
}

export const getStaticProps: GetStaticProps = (ctx) => {
    const posts = getAllPosts().sort((a, b) => a.timestamp - b.timestamp);
    return { props: { posts } }
}

export default page;
