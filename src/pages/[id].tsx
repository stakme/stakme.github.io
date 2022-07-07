import Head from "next/head";
import { FC, ReactNode } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { getPost, getAllPosts, Line, Content, Post, PostID } from "../query";
import { TextLink } from "../components/link";
import { NestedList, NestedListItem } from "../query/type";

const renderLine: (line: Line) => ReactNode = (line) => {
    return line.map((l) => {
        if (l.type === "raw") {
            return l.str;
        }
        if (l.type === "code") {
            return <code className="bg-orange-100 p-1 mx-1">{l.str}</code>;
        }
        if (l.type === "link") {
            return <TextLink href={l.href}>{l.content}</TextLink>;
        }
        if (l.type === "image") {
            return <img src={l.src} alt={l.alt} title={l.title} />;
        }
    });
};

const renderListItems: (items: NestedListItem[]) => ReactNode = (items) => {
    return items.map((item) => {
        if (item.child) {
            return (
                <li className="mt-4">
                    {[renderLine(item.line), renderList(item.child)]}
                </li>
            );
        }
        return <li className="mt-1">{renderLine(item.line)}</li>;
    });
};

const renderList: (list: NestedList) => ReactNode = (list) => {
    if (list.order === "ordered") {
        return (
            <ol className="list-decimal list-inside">
                {renderListItems(list.items)}
            </ol>
        );
    }
    if (list.order === "unordered") {
        return (
            <ul className="list-disc list-inside">
                {renderListItems(list.items)}
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
        return <div className="my-8">{renderList(content)}</div>;
    }
    return <div></div>;
};

const Blog: FC<{ post: Post }> = ({ post }) => {
    return (
        <main className="m-8">
            <Head>
                <title>大丈夫になりたい | {post.summary}</title>
            </Head>

            <TextLink href="/">top</TextLink>
            <article>
                <p style={{ marginBottom: "1em", color: "gray" }}>
                    {post.published_at}
                </p>
                {post.contents.map((content, i) => renderContent(content, i))}
            </article>
        </main>
    );
};

export const getStaticProps: GetStaticProps<{ id: string }> = async (ctx) => {
    const postID = ctx.params!.id as PostID;
    const post = getPost(postID);
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
