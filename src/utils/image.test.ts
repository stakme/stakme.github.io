import { createCanvas } from "canvas";
import { FooterPosition, footerPosition } from "./image";

test("list conversion", () => {
    const expected: FooterPosition = {
        icon: {
            x: 456,
            y: 480,
            radius: 40,
        },
        url: {
            text: "stak.me",
            x: 556,
            y: 500,
            width: 188,
        },
    };

    const width = 1200;
    const height = 600;
    const canvas = createCanvas(width, height);
    const got = footerPosition(
        canvas,
        "stak.me",
        '300 40pt "BIZ UDGothic',
        40,
        40
    );
    expect(got).toEqual(expected);
});
