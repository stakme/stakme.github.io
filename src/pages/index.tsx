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
            </main>
        </div>
    );
};

export const getStaticProps: GetStaticProps = (ctx) => {
    const posts = getAllPosts().sort((a, b) => a.timestamp - b.timestamp);
    return { props: { posts } };
};

export default page;
