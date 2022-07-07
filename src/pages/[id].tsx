import Head from "next/head";
import { FC, ReactNode } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { getPost, getAllPosts, Post, PostID } from "../query";
import { TextLink } from "../components/link";
import { Content, Line } from "../query/parse";

const renderLine: (line: Line) => ReactNode = (line) => {
    return line.map((l) => {
        if (l.type === "raw") {
            return l.str;
        }
        if (l.type === "code") {
            return <code className="bg-orange-100 p-1 mx-1">{l.str}</code>;
        }
        if (l.type === "image") {
            return <img src={l.src} alt={l.alt} title={l.title} />;
        }
    });
};

const RenderContent: FC<{ content: Content }> = ({ content }) => {
    if (content.type === "paragraph") {
        return <p>{content.lines.map((line) => renderLine(line)).flat()}</p>;
    }
    if (content.type === "list") {
        console.log(content);
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
                <p>
                    {post.contents.map((content, i) => (
                        <RenderContent content={content} key={i} />
                    ))}
                </p>
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
