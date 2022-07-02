import Head from 'next/head'
import Link from 'next/link'

export default function Home({ posts }) {
    return (
        <div className="container">
            <Head>
                <title>@stakme | 大丈夫になりたい</title>
            </Head>

            <main>
                <h1>
                    @stakme
                </h1>
                <h2>
                    大丈夫になりたい
                </h2>
                <ul>
                    {posts.map(p => <li><Link href={`/${encodeURIComponent(p.id)}`}>{p.id}</Link></li>)}
                </ul>
            </main>
        </div>
    )
}

export async function getStaticProps(ctx) {
    const posts = require('../query').getAllPosts();
    return { props: { posts } }
}
