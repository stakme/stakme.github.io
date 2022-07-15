import { Content } from "../query";
import { MDLinePart } from "../query/parse";
import { NestedListItem } from "../query/type";

const separator = " ";

const getLinePartString: (line: MDLinePart) => string = (line) => {
    switch (line.type) {
        case "raw":
        case "code": {
            return line.str;
        }
        case "link": {
            return line.contents.map(getLinePartString).join(separator);
        }
    }
};

const getListItemString: (item: NestedListItem) => string = (item) => {
    const strings = item.line.map((l) => getLinePartString(l));
    if (item.child) {
        strings.push(...item.child.items.map(getListItemString));
    }
    return strings.join(separator);
};

export const getContentsString: (contents: Content[]) => string = (
    contents
) => {
    const strings = [];
    for (const content of contents) {
        switch (content.type) {
            case "headline": {
                strings.push(...content.items.map(getLinePartString));
                continue;
            }
            case "paragraph": {
                strings.push(...content.lines.flat().map(getLinePartString));
                continue;
            }
            case "list": {
                strings.push(...content.items.map(getListItemString));
                continue;
            }
            case "image": {
                strings.push(content.title);
                continue;
            }
            case "pre": {
                strings.push(...content.lines);
                continue;
            }
        }
    }
    return strings.join(separator);
};
