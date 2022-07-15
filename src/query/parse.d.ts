interface ParsedPost {
    title: string;
    tags: string;
    published_at: string;
    og_title?: string;
    draft?: string;
    contents: ParsedContent[];
}

// content
type ParsedContent = MDParagraph | List | Headline | PreformattedText;

interface MDParagraph {
    type: "paragraph";
    lines: MDLine[];
}

interface PreformattedText {
    type: "pre";
    style: string;
    lines: string[];
}

// list
interface List {
    type: "list";
    items: ListItem[];
}
interface ListItem {
    type: "ordered" | "unordered";
    depth: number;
    line: MDLine;
}

// headline
interface Headline {
    type: "headline";
    depth: number;
    items: (RawLinePart | CodeLinePart | LinkLinePart)[];
}

// line
export type MDLine = MDLinePart[];
type MDLinePart = RawLinePart | CodeLinePart | MDImageLinePart | LinkLinePart;
interface RawLinePart {
    type: "raw";
    str: string;
}
interface CodeLinePart {
    type: "code";
    str: string;
}
interface MDImageLinePart {
    type: "image";
    featured: boolean;
    alt: string;
    src: string;
    title?: string;
}
interface LinkLinePart {
    type: "link";
    contents: (RawLinePart | CodeLinePart)[];
    href: string;
}

export function parse(content: string): ParsedPost;
