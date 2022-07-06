interface ParsedPost {
    summary: string;
    tags: string;
    published_at: string;
    content: string[];
}
export function parse(content: string): ParsedPost
