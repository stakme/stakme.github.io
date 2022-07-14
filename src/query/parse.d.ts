interface ParsedPost {
    title: string;
    tags: string;
    published_at: string;
    og_title?: string;
    draft?: string;
    contents: ParsedContent[];
}

// content
type ParsedContent = RawParagraph | List | Headline | PreformattedText;

interface RawParagraph {
    type: "paragraph";
    lines: Line[];
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
    line: Line;
}

// headline
interface Headline {
    type: "headline";
    depth: number;
    items: Line;
}

// line
type Line = LinePart[];
type LinePart = RawLinePart | CodeLinePart | ImageLinePart | LinkLinePart;
interface RawLinePart {
    type: "raw";
    str: string;
}
interface CodeLinePart {
    type: "code";
    str: string;
}
interface ImageLinePart {
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
