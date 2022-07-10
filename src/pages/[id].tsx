import Head from "next/head";
import { FC, ReactNode } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import { getPost, getAllPosts, Line, Content, Post, PostID } from "../query";
import { TextLink } from "../components/link";
import { NestedList } from "../query/type";

const renderLine: (line: Line) => ReactNode = (line) => {
    return line.map((l, i) => {
        if (l.type === "raw") {
            return l.str;
        }
        if (l.type === "code") {
            return (
                <code className="bg-orange-100 p-1 mx-1" key={i}>
                    {l.str}
                </code>
            );
        }
        if (l.type === "link") {
            return (
                <TextLink href={l.href} key={i}>
                    {l.content}
                </TextLink>
            );
        }
        if (l.type === "image") {
            return (
                <Image
                    key={i}
                    src={l.src}
                    alt={l.alt}
                    title={l.title}
                    objectFit="contain"
                    layout="responsive"
                    // TODO: そのうちなんとかする
                    height="514"
                    width="948"
                />
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
            <ol className="list-decimal list-inside" key={list.depth}>
                {renderListItems(list)}
            </ol>
        );
    }
    if (list.order === "unordered") {
        return (
            <ul className="list-disc list-inside" key={list.depth}>
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
        return (
            <p key={i}>
                {content.lines.map((line) => renderLine(line)).flat()}
            </p>
        );
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
            <pre key={i} className="overflow-auto bg-stone-100 p-6 m-4">
                {content.lines.join("\n")}
            </pre>
        );
    }
    return <span key={i}></span>;
};

const Blog: FC<{ post: Post }> = ({ post }) => {
    return (
        <main className="m-8 container mx-auto">
            <Head>
                <title>大丈夫になりたい | {post.summary}</title>
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@stakme" />
                <meta
                    name="twitter:title"
                    content="@stakme | 大丈夫になりたい"
                />
                <meta name="twitter:description" content={post.summary} />
                <meta
                    name="twitter:image"
                    content={`https://stak.me/public/${post.ogImagePath}`}
                />
            </Head>

            <TextLink href="/">top</TextLink>
            <article>
                <div style={{ marginBottom: "1em", color: "gray" }}>
                    {post.published_at}
                </div>
                {post.contents.map((content, i) => renderContent(content, i))}
            </article>
        </main>
    );
};

export const getStaticProps: GetStaticProps<{ id: string }> = async (ctx) => {
    const postID = ctx.params!.id as PostID;
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
