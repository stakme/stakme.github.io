import { getImageDetail } from "../utils/image";
import { List, MDImage } from "./parse";
import { Image, NestedList, NestedListItem } from "./type";

export const convertList = (list: List): NestedList => {
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
                items: [{ line: item.line }],
            };
            parentByDepth[depth] = next.child.items;
            continue;
        }
        if (item.depth < depth) {
            depth = item.depth;
        }
        parentByDepth[depth].push({ line: item.line });
    }
    return result;
};

export const convertImage: (id: string, img: MDImage) => Image = (id, img) => {
    const src = `/posts/${id}/${img.src}`;
    const detail = getImageDetail(src);
    return { ...img, src, detail };
};
