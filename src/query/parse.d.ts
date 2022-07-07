interface ParsedPost {
    summary: string;
    tags: string;
    published_at: string;
    contents: ParsedContent[];
}

type ParsedContent = Paragraph | List;
interface Paragraph {
    type: "paragraph";
    lines: Line[];
}

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
    alt: string;
    src: string;
    title?: string;
}
interface LinkLinePart {
    type: "link";
    content: string;
    href: string;
}

interface List {
    type: "list";
    items: ListItem[];
}
interface ListItem {
    type: "ordered" | "unordered";
    depth: number;
    line: Line;
}

export function parse(content: string): ParsedPost;
