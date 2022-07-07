import { convertList } from "./convert";
import { List } from "./parse";
import { NestedList } from "./type";

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

test("list conversion", () => {
    const expected: NestedList = {
        type: "list",
        order: "unordered",
        depth: 0,
        items: [
            { line: [{ type: "raw", str: "a" }] },
            {
                line: [{ type: "raw", str: "b" }],
                child: {
                    type: "list",
                    order: "ordered",
                    depth: 1,
                    items: [
                        { line: [{ type: "raw", str: "X" }] },
                        {
                            line: [{ type: "raw", str: "Y" }],
                            child: {
                                type: "list",
                                order: "unordered",
                                depth: 2,
                                items: [
                                    { line: [{ type: "raw", str: "!" }] },
                                    { line: [{ type: "raw", str: "?" }] },
                                ],
                            },
                        },
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
            { type: "unordered", depth: 2, line: [{ type: "raw", str: "!" }] },
            { type: "unordered", depth: 2, line: [{ type: "raw", str: "?" }] },
            { type: "ordered", depth: 1, line: [{ type: "raw", str: "Z" }] },
            { type: "unordered", depth: 0, line: [{ type: "raw", str: "c" }] },
        ],
    });
    expect(got).toEqual(expected);
});
