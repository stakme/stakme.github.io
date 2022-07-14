import { FC, ReactNode } from "react";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import { getAllPosts, Post } from "../query";
import { TextLink } from "../components/link";
import { ImageDetail } from "../utils/image";

interface PostSummary {
    id: string;
    summary: string;
    published_at: string;
    og_image: ImageDetail;
    tags: string;
}

const Header: FC = () => {
    return (
        <header className="mb-8 grid auto-cols-min grid-cols-1 gap-y-4 md:grid-cols-2">
            <div>
                <h1
                    className="text-6xl

                font-bold lg:text-8xl"
                >
                    @stakme
                </h1>
            </div>
            <div className="flex items-end justify-end gap-x-2">
                <TextLink href="https://twitter.com/stakme">Twitter</TextLink>
                <TextLink href="https://github.com/stakme">GitHub</TextLink>
            </div>
        </header>
    );
};

const page: FC<{ posts: PostSummary[] }> = ({ posts }) => {
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
                    content="インターネットに関連する何かが置いてあるブログ"
                />
            </Head>

            <main className="container mx-auto 2xl:px-80">
                <Header />
                <div className="grid-col-1 grid gap-4">
                    {posts.map((post) => (
                        <section key={post.id}>
                            <TextLink href={`/${encodeURIComponent(post.id)}`}>
                                {post.summary}
                            </TextLink>
                            <div>{post.tags}</div>
                        </section>
                    ))}
                </div>
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

export const getStaticProps: GetStaticProps = async (ctx) => {
    const posts: PostSummary[] = (await getAllPosts())
        .sort((a, b) => b.timestamp - a.timestamp)
        .map(({ id, summary, published_at, og_image, tags, ..._ }) => ({
            id,
            summary,
            published_at,
            og_image,
            tags,
        }));
    return { props: { posts } };
};

export default page;
