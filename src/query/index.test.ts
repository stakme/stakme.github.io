import { Line, List } from "./parse";

const list223: List = {
    type: "list",
    items: [
        { type: "unordered", depth: 0, line: [{ type: "raw", str: "a" }] },
        { type: "unordered", depth: 0, line: [{ type: "raw", str: "b" }] },
        { type: "ordered", depth: 1, line: [{ type: "raw", str: "X" }] },
        { type: "ordered", depth: 1, line: [{ type: "raw", str: "Y" }] },
        { type: "ordered", depth: 1, line: [{ type: "raw", str: "Z" }] },
        { type: "unordered", depth: 0, line: [{ type: "raw", str: "c" }] },
    ],
};

export interface List2 {
    type: "unordered" | "ordered";
    items: ListItem[];
}
export interface ListItem {
    line: Line;
    child?: List2;
}

const convertList: (list: List) => List2 = (list) => {
    const result: List2 = {
        type: list.items[0].type,
        items: [],
    };
    let depth = 0;
    const parentByDepth: { [key: number]: ListItem[] } = { 0: result.items };
    let itemsRef: ListItem[] = result.items;
    for (const item of list.items) {
        if (depth < item.depth) {
            depth = item.depth;
            const next = itemsRef[itemsRef.length - 1];
            next.child = {
                type: item.type,
                items: [{ line: item.line }],
            };
            itemsRef = next.child.items;
            parentByDepth[depth] = itemsRef;
            continue;
        }
        if (depth > item.depth) {
            depth = item.depth;
            itemsRef = parentByDepth[depth];
        }
        itemsRef.push({ line: item.line });
    }
    return result;
};

test("list conversion", () => {
    const expected: List2 = {
        type: "unordered",
        items: [
            { line: [{ type: "raw", str: "a" }] },
            {
                line: [{ type: "raw", str: "b" }],
                child: {
                    type: "ordered",
                    items: [
                        { line: [{ type: "raw", str: "X" }] },
                        { line: [{ type: "raw", str: "Y" }] },
                        { line: [{ type: "raw", str: "Z" }] },
                    ],
                },
            },
            { line: [{ type: "raw", str: "c" }] },
        ],
    };
    const got = convertList({
        type: "list",
        items: [
            { type: "unordered", depth: 0, line: [{ type: "raw", str: "a" }] },
            { type: "unordered", depth: 0, line: [{ type: "raw", str: "b" }] },
            { type: "ordered", depth: 1, line: [{ type: "raw", str: "X" }] },
            { type: "ordered", depth: 1, line: [{ type: "raw", str: "Y" }] },
            { type: "ordered", depth: 1, line: [{ type: "raw", str: "Z" }] },
            { type: "unordered", depth: 0, line: [{ type: "raw", str: "c" }] },
        ],
    });
    expect(got).toEqual(expected);
});
