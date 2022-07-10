import { createCanvas } from "canvas";
import { FooterPosition, footerPosition } from "./image";

test("list conversion", () => {
    const expected: FooterPosition = {
        icon: {
            x: 0,
            y: 0,
            radius: 40,
        },
        url: {
            text: "stak.me",
            x: 566,
            y: 0,
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
