interface ParsedPost {
    summary: string;
    tags: string;
    published_at: string;
    contents: Content[];
}

type Content = Paragraph;
interface Paragraph {
    type: "paragraph";
    lines: Line[];
}

type Line = LinePart[];
type LinePart = RawLinePart | CodeLinePart | ImageLinePart;
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

export function parse(content: string): ParsedPost;
