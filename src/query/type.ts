import { Line, Paragraph } from "./parse";

export type PostID = string;
export interface Post {
    id: PostID;
    summary: string;
    tags: string;
    published_at: string;
    contents: Content[];
    timestamp: number;
}

export type Content = Paragraph | NestedList;

export interface NestedList {
    type: "list";
    order: "unordered" | "ordered";
    items: NestedListItem[];
}
export interface NestedListItem {
    line: Line;
    child?: NestedList;
}
