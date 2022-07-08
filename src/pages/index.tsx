import { FC } from "react";
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";
import { getAllPosts, Post } from "../query";
import { TextLink } from "../components/link";

const page: FC<{ posts: Post[] }> = ({ posts }) => {
    return (
        <div>
            <Head>
                <title>@stakme | 大丈夫になりたい</title>

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@stakme" />
                <meta
                    name="twitter:title"
                    content="@stakme | 大丈夫になりたい"
                />
                <meta
                    name="twitter:description"
                    content="TODO: ここのテキスト後でなんとかする"
                />
            </Head>

            <main className="m-8">
                <h1 className="text-xl font-bold ">@stakme</h1>
                <h2>大丈夫になりたい</h2>
                <ul className="mt-8">
                    {posts.map((p) => (
                        <li key={p.id} className="mt-2">
                            <TextLink href={`/${encodeURIComponent(p.id)}`}>
                                [{p.published_at}] {p.id}
                                <br />
                                {p.summary}
                            </TextLink>
                        </li>
                    ))}
                </ul>
                <div className="pt-8">
                    <p>
                        このサイトはGoogleアナリティクスを利用し、お使いのウェブブラウザから特定の情報を収集します。
                    </p>
                    <p>
                        <TextLink href="https://policies.google.com/technologies/partner-sites">
                            データが収集、処理される仕組みについて
                            (Google提供サイト)
                        </TextLink>
                    </p>
                </div>
            </main>
        </div>
    );
};

export const getStaticProps: GetStaticProps = (ctx) => {
    const posts = getAllPosts().sort((a, b) => a.timestamp - b.timestamp);
    return { props: { posts } };
};

export default page;
