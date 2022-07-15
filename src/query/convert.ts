import { getImageDetail } from "../utils/image";
import { List, MDLine, MDParagraph } from "./parse";
import { Line, NestedList, NestedListItem, Paragraph } from "./type";

export const convertList = (id: string, list: List): NestedList => {
    const result: NestedList = {
        type: "list",
        order: list.items[0].type,
        depth: 0,
        items: [],
    };
    let depth = 0;
    const parentByDepth: { [key: number]: NestedListItem[] } = {
        0: result.items,
    };
    for (const item of list.items) {
        if (depth < item.depth) {
            depth = item.depth;
            const parent = parentByDepth[depth - 1];
            const next = parent[parent.length - 1];
            next.child = {
                type: "list",
                order: item.type,
                depth: item.depth,
                items: [{ line: convertLine(id, item.line) }],
            };
            parentByDepth[depth] = next.child.items;
            continue;
        }
        if (item.depth < depth) {
            depth = item.depth;
        }
        parentByDepth[depth].push({ line: convertLine(id, item.line) });
    }
    return result;
};

export const convertParagraph: (
    id: string,
    paragraph: MDParagraph
) => Paragraph = (id, paragraph) => {
    return {
        ...paragraph,
        lines: paragraph.lines.map((line) => convertLine(id, line)),
    };
};

const convertLine = (id: string, line: MDLine): Line => {
    return line.map((line) => {
        if (line.type !== "image") {
            return line;
        }
        const src = `/posts/${id}/${line.src}`;
        const detail = getImageDetail(src);
        return { ...line, src, detail };
    });
};
