import Head from "next/head";
import { FC, ReactNode } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import { getPost, getAllPosts, Line, Content, Post, PostID } from "../query";
import { TextLink } from "../components/link";
import { NestedList, NestedListItem } from "../query/type";

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
                <span className="block max-w-md" key={i}>
                    <Image
                        src={l.src}
                        alt={l.alt}
                        title={l.title}
                        width={948}
                        height={514}
                    />
                </span>
            );
        }
    });
};

const renderListItems: (list: NestedList) => ReactNode = (list) => {
    const c = list.depth === 0 ? "mt-1" : `mt-1 ml-${list.depth * 12}`;
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
            <pre key={i} className="bg-stone-100 p-6 m-4">
                {content.lines.join("\n")}
            </pre>
        );
    }
    return <span key={i}></span>;
};

const Blog: FC<{ post: Post }> = ({ post }) => {
    return (
        <main className="m-8">
            <Head>
                <title>大丈夫になりたい | {post.summary}</title>
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
    const post = getPost(postID);
    console.log((post.contents[1] as NestedList).items![1].child!.items[1]);
    return {
        props: {
            id: postID,
            post: post,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = getAllPosts();
    const paths = posts.map((post) => ({ params: { id: post.id } }));
    return {
        paths,
        fallback: false,
    };
};

export default Blog;
