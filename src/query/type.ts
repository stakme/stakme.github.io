import { ImageDetail } from "../utils/image";
import {
    CodeLinePart,
    Headline,
    LinkLinePart,
    MDHeadline,
    MDImageLinePart,
    PreformattedText,
    RawLinePart,
} from "./parse";

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

export interface Paragraph {
    type: "paragraph";
    lines: Line[];
}

export type Line = LinePart[];
type LinePart = RawLinePart | CodeLinePart | ImageLinePart | LinkLinePart;
export interface ImageLinePart extends MDImageLinePart {
    detail: ImageDetail;
}

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
