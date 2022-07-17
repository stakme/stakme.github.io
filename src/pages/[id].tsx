import Head from "next/head";
import { FC, ReactNode } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import { getPost, getAllPosts, Line, Content, Post, PostID } from "../query";
import { TextLink } from "../components/link";
import { NestedList } from "../query/type";
import { MainContainer } from "../components/container";
import { Header } from "../components/header";
import { Headline } from "../components/headline";
import { Footer } from "../components/footer";

const renderLine: (line: Line) => ReactNode = (line) => {
    return line.map((l, i) => {
        if (l.type === "raw") {
            return l.str;
        }
        if (l.type === "code") {
            return (
                <code
                    className="rounded-md border border-orange-400 bg-orange-100 py-0.5 px-1"
                    key={i}
                >
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
            <ol className="grid list-decimal gap-1.5 pl-6" key={list.depth}>
                {renderListItems(list)}
            </ol>
        );
    }
    if (list.order === "unordered") {
        return (
            <ul className="grid list-disc gap-1.5 pl-6" key={list.depth}>
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
        return <div key={i}>{renderList(content)}</div>;
    }
    if (content.type === "pre") {
        return (
            <pre key={i} className="overflow-auto bg-stone-100 p-6">
                {content.lines.join("\n")}
            </pre>
        );
    }
    if (content.type === "image") {
        return (
            <div key={i} className="flex justify-center">
                <div
                    className="flex max-w-xl flex-col rounded-xl border"
                    key={i}
                >
                    <Image
                        className="rounded-t-xl "
                        key={i}
                        src={content.src}
                        alt={content.alt}
                        title={content.title}
                        objectFit="contain"
                        height={content.detail.height}
                        width={content.detail.width}
                    />

                    <div className="p-3 text-sm text-gray-500">
                        {content.title}
                    </div>
                </div>
            </div>
        );
    }
    if (content.type === "headline") {
        let c = "";
        if (content.depth === 2) {
            c = "mt-8";
        }
        return (
            <div className={c}>
                <Headline key={i} depth={content.depth}>
                    {renderLine(content.items)}
                </Headline>
            </div>
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
                <meta name="twitter:title" content={post.title} />
                <meta
                    name="twitter:description"
                    content="@stakme | 大丈夫になりたい"
                />
                <meta
                    name="twitter:image"
                    content={`https://stak.me${post.og_image.path}`}
                />
            </Head>

            <Header />
            <article>
                <div className="my-8 border-b-4 border-dotted pb-8">
                    <div className="mb-2 text-gray-500">
                        {post.published_at}
                    </div>
                    <Headline depth={2}>{post.title}</Headline>
                </div>
                <div className="grid grid-cols-1 gap-4 font-serif leading-7">
                    {post.contents.map((content, i) =>
                        renderContent(content, i)
                    )}
                </div>
            </article>
            <Footer />
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
