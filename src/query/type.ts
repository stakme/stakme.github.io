import { ImageDetail } from "../utils/image";
import { Headline, Line, Paragraph, PreformattedText } from "./parse";

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

export type Content = Paragraph | NestedList | Headline | PreformattedText;

export interface NestedList {
    type: "list";
    order: "unordered" | "ordered";
    depth: number;
    items: NestedListItem[];
}
export interface NestedListItem {
    line: Line;
    child?: NestedList;
}
