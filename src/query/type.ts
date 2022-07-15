import { ImageDetail } from "../utils/image";
import { Headline, MDImage, MDLine, PreformattedText } from "./parse";

export type PostID = string;
export interface Post {
    id: PostID;
    title: string;
    og_title: string;
    og_image: ImageDetail;
    card_type: "text" | "image";
    tags: string;
    published_at: string;
    contents: Content[];
    timestamp: number;
}

export type Content =
    | Paragraph
    | NestedList
    | Headline
    | Image
    | PreformattedText;

export interface Image extends MDImage {
    detail: ImageDetail;
}

export interface Paragraph {
    type: "paragraph";
    lines: MDLine[];
}

export interface NestedList {
    type: "list";
    order: "unordered" | "ordered";
    depth: number;
    items: NestedListItem[];
}
export interface NestedListItem {
    line: MDLine;
    child?: NestedList;
}
