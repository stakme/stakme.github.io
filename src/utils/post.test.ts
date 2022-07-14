import { getContentsString } from "./post";

test("getContentsString", () => {
    const expected =
        "headline string headline str " +
        "raw string code str " +
        "linked code linked raw string " +
        "alt " +
        "list string 1 list string 2 " +
        "list string a list string b " +
        "list string 3 " +
        "pre content 1 pre content 2";
    const got = getContentsString([
        {
            type: "headline",
            depth: 2,
            items: [
                { type: "raw", str: "headline string" },
                { type: "code", str: "headline str" },
            ],
        },
        {
            type: "paragraph",
            lines: [
                [
                    { type: "raw", str: "raw string" },
                    { type: "code", str: "code str" },
                ],
                [
                    {
                        type: "link",
                        href: "href",
                        contents: [
                            { type: "code", str: "linked code" },
                            { type: "raw", str: "linked raw string" },
                        ],
                    },
                    { type: "image", src: "src", alt: "alt" },
                ],
            ],
        },
        {
            type: "list",
            order: "ordered",
            depth: 0,
            items: [
                { line: [{ type: "raw", str: "list string 1" }] },
                {
                    line: [{ type: "raw", str: "list string 2" }],
                    child: {
                        type: "list",
                        order: "unordered",
                        depth: 1,
                        items: [
                            { line: [{ type: "raw", str: "list string a" }] },
                            { line: [{ type: "raw", str: "list string b" }] },
                        ],
                    },
                },
                { line: [{ type: "raw", str: "list string 3" }] },
            ],
        },
        {
            type: "pre",
            style: "md",
            lines: ["pre content 1", "pre content 2"],
        },
    ]);
    expect(got).toEqual(expected);
});
