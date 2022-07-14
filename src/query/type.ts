import { ImageDetail } from "../utils/image";
import {
    CodeLinePart,
    Headline,
    ImageLinePart,
    LinkLinePart,
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

interface Paragraph {
    type: "paragraph";
    lines: Line[];
}

export type Line = LinePart[];
type LinePart = RawLinePart | CodeLinePart | PostImageLinePart | LinkLinePart;
interface PostImageLinePart extends ImageLinePart {
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
