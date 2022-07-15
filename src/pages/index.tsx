import { FC } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import { getAllPosts } from "../query";
import { TextLink } from "../components/link";
import { ImageDetail } from "../utils/image";
import { MainContainer } from "../components/container";
import { getContentsString } from "../utils/post";
import { Header } from "../components/header";
import Image from "next/image";
import Link from "next/link";
import { Headline } from "../components/headline";

interface PostSummary {
    id: string;
    title: string;
    summary: string;
    published_at: string;
    og_image: ImageDetail;
    card_type: "text" | "image";
    tags: string;
}

const page: FC<{ posts: PostSummary[] }> = ({ posts }) => {
    return (
        <MainContainer>
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
                    content="インターネットに関連する何かが置いてあるブログ"
                />
            </Head>

            <main>
                <Header />
                <div className="grid gap-4">
                    <Headline depth={2}>最近の記事</Headline>
                    {posts.map((post) => (
                        <section
                            key={post.id}
                            className="flex flex-col rounded-xl border"
                        >
                            <Link href={`/${encodeURIComponent(post.id)}`}>
                                <a>
                                    {post.card_type === "image" && (
                                        <Image
                                            className="rounded-t-xl"
                                            src={post.og_image.path}
                                            width={post.og_image.width}
                                            height={post.og_image.height}
                                            alt={post.title}
                                        />
                                    )}
                                    <div className="p-4">
                                        <TextLink
                                            href={`/${encodeURIComponent(
                                                post.id
                                            )}`}
                                        >
                                            <Headline depth={5}>
                                                {post.title}
                                            </Headline>
                                        </TextLink>
                                        <div className="my-1">
                                            {post.summary}
                                        </div>
                                        <div>{post.tags}</div>
                                    </div>
                                </a>
                            </Link>
                        </section>
                    ))}
                </div>
                <div className="py-8">
                    <p>
                        このサイトはGoogleアナリティクスを利用し、お使いのウェブブラウザから特定の情報を収集します。
                        <TextLink href="https://policies.google.com/technologies/partner-sites">
                            データが収集、処理される仕組みについて
                            (Google提供サイト)
                        </TextLink>
                    </p>
                </div>
            </main>
        </MainContainer>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const posts: PostSummary[] = (await getAllPosts())
        .sort((a, b) => b.timestamp - a.timestamp)
        .map(
            ({
                id,
                title,
                published_at,
                og_image,
                tags,
                contents,
                card_type,
            }) => {
                let summary = getContentsString(contents);
                if (summary.length > 80) {
                    summary = summary.slice(0, 80) + "……";
                }
                return {
                    id,
                    title,
                    summary,
                    published_at,
                    og_image,
                    card_type,
                    tags,
                };
            }
        );
    return { props: { posts } };
};

export default page;
