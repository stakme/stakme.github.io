import { ImageDetail } from "../utils/image";
import { Line, Paragraph, PreformattedText } from "./parse";

export type PostID = string;
export interface Post {
    id: PostID;
    summary: string;
    og_title: string;
    og_image: ImageDetail;
    tags: string;
    published_at: string;
    contents: Content[];
    timestamp: number;
}

export type Content = Paragraph | NestedList | PreformattedText;

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
