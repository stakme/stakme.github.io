import Head from "next/head";
import { FC, ReactNode } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import { getPost, getAllPosts, Line, Content, Post, PostID } from "../query";
import { TextLink } from "../components/link";
import { NestedList } from "../query/type";
import { getContentsString } from "../utils/post";
import { MainContainer } from "../components/container";
import { Header } from "../components/header";
import { Headline } from "../components/headline";

const renderLine: (line: Line) => ReactNode = (line) => {
    return line.map((l, i) => {
        if (l.type === "raw") {
            return l.str;
        }
        if (l.type === "code") {
            return (
                <code className="mx-1 bg-orange-100 p-1" key={i}>
                    {l.str}
                </code>
            );
        }
        if (l.type === "link") {
            return (
                <TextLink href={l.href} key={i}>
                    {renderLine(l.contents)}
                </TextLink>
            );
        }
        if (l.type === "image") {
            return (
                <div className="flex flex-col rounded-xl border" key={i}>
                    <Image
                        className="rounded-t-xl"
                        key={i}
                        src={l.src}
                        alt={l.alt}
                        title={l.title}
                        objectFit="contain"
                        height={l.detail.height}
                        width={l.detail.width}
                    />
                    <div className="p-2 text-sm text-gray-500">{l.title}</div>
                </div>
            );
        }
    });
};

const renderListItems: (list: NestedList) => ReactNode = (list) => {
    const classList = ["mt-1"];
    if (list.depth === 1) {
        classList.push("ml-8");
    }
    const c = classList.join(" ");
    return list.items.map((item, i) => {
        if (item.child) {
            return (
                <li className={c} key={i}>
                    {[renderLine(item.line), renderList(item.child)]}
                </li>
            );
        }
        return (
            <li className={c} key={i}>
                {renderLine(item.line)}
            </li>
        );
    });
};

const renderList: (list: NestedList) => ReactNode = (list) => {
    if (list.order === "ordered") {
        return (
            <ol className="list-inside list-decimal" key={list.depth}>
                {renderListItems(list)}
            </ol>
        );
    }
    if (list.order === "unordered") {
        return (
            <ul className="list-inside list-disc" key={list.depth}>
                {renderListItems(list)}
            </ul>
        );
    }
};

const renderContent: (content: Content, index: number) => ReactNode = (
    content,
    i
) => {
    if (content.type === "paragraph") {
        return <div key={i}>{content.lines.map(renderLine).flat()}</div>;
    }
    if (content.type === "list") {
        return (
            <div className="my-8" key={i}>
                {renderList(content)}
            </div>
        );
    }
    if (content.type === "pre") {
        return (
            <pre key={i} className="m-4 overflow-auto bg-stone-100 p-6">
                {content.lines.join("\n")}
            </pre>
        );
    }
    if (content.type === "headline") {
        return (
            <Headline key={i} depth={content.depth}>
                {renderLine(content.items)}
            </Headline>
        );
    }
    return <span key={i}></span>;
};

const Blog: FC<{ post: Post }> = ({ post }) => {
    return (
        <MainContainer>
            <Head>
                <title>大丈夫になりたい | {post.title}</title>
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@stakme" />
                <meta
                    name="twitter:title"
                    content="@stakme | 大丈夫になりたい"
                />
                <meta
                    name="twitter:description"
                    content={getContentsString(post.contents)}
                />
                <meta
                    name="twitter:image"
                    content={`https://stak.me/${post.og_image.path}`}
                />
            </Head>

            <Header />
            <article>
                {post.title ? (
                    <Headline depth={2}>{post.title}</Headline>
                ) : (
                    <></>
                )}
                <div className="py-2 text-right text-gray-500">
                    {post.published_at}
                </div>
                {post.contents.map((content, i) => renderContent(content, i))}
            </article>
        </MainContainer>
    );
};

export const getStaticProps: GetStaticProps<{ id: string }> = async (ctx) => {
    const postID = ctx.params?.id as PostID;
    const post = await getPost(postID);
    return {
        props: {
            id: postID,
            post: post,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await getAllPosts();
    const paths = posts.map((post) => ({ params: { id: post.id } }));
    return {
        paths,
        fallback: false,
    };
};

export default Blog;
