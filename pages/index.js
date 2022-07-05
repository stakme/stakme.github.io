import Head from 'next/head'
import Link from 'next/link'
import { getAllPosts } from '../query'

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
                    {posts.map(p =>
                        <li key={p.id} style={{ marginBottom: '1em' }}>
                            <Link href={`/${encodeURIComponent(p.id)}`}><a>[{p.published_at}] {p.id}<br />{p.summary}</a></Link>
                        </li>)}
                </ul>
            </main>
        </div>
    )
}

export async function getStaticProps(ctx) {
    const posts = getAllPosts().sort((a, b) => a.timestamp - b.timestamp);
    return { props: { posts } }
}
