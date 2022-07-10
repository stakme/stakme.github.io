import { createCanvas, registerFont, loadImage, Canvas } from "canvas";
import fs from "fs";
import { ogBackground, ogTextColor } from "./color";

registerFont("font/M_PLUS_Rounded_1c/MPLUSRounded1c-Regular.ttf", {
    family: "M PLUS Rounded 1c",
});
registerFont("font/M_PLUS_Rounded_1c/MPLUSRounded1c-Light.ttf", {
    family: "M PLUS Rounded 1c",
    weight: "300",
});

export interface FooterPosition {
    icon: {
        x: number;
        y: number;
        radius: number;
    };
    url: {
        text: string;
        x: number;
        y: number;
    };
}

export const footerPosition: (
    canvas: Canvas,
    url: string,
    font: string,
    merginBottom: number,
    radius: number
) => FooterPosition = (canvas, url, font, merginBottom, radius) => {
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext("2d");
    ctx.font = font;

    const mergin = radius / 2;
    const centerX = width / 2;
    const centerY = height - merginBottom - radius;

    const {
        width: urlWidth,
        actualBoundingBoxAscent,
        actualBoundingBoxDescent,
    } = ctx.measureText(url);
    const urlHeight = actualBoundingBoxAscent + actualBoundingBoxDescent;
    const footerWidth = radius * 2 + mergin + urlWidth;
    const footerStart = centerX - footerWidth / 2;
    return {
        icon: {
            x: footerStart,
            y: centerY - radius,
            radius,
        },
        url: {
            text: url,
            x: footerStart + radius * 2 + mergin,
            y: centerY - urlHeight / 2,
        },
    };
};

export const createImage: (text: string) => void = async (text) => {
    // canvas
    const width = 1200;
    const height = 600;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // background
    ctx.fillStyle = ogBackground;
    ctx.fillRect(0, 0, width, height);

    // text
    const lines = text.split("\n").map((l) => l.trim());
    const fontSize = lines.length === 1 ? 70 : lines.length === 2 ? 60 : 50;
    ctx.font = `${fontSize}pt "M PLUS Rounded 1c"`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = ogTextColor;

    const textHeight = lines
        .map((line) => ctx.measureText(line))
        .map((d) => d.actualBoundingBoxAscent + d.actualBoundingBoxDescent)
        .reduce((p, c) => (p > c ? p : c), 0);
    const lineHeight = textHeight * 1.4;

    // position
    const mergin = 40;
    const footerHeight = 60;
    const titleCenterY = mergin + (height - 3 * mergin - footerHeight) / 2;
    const titleStartY = titleCenterY - (lineHeight * lines.length) / 2;
    const titleWidth = width - mergin * 2;
    const centerX = width / 2;
    lines.forEach((line, index) => {
        const centerY = titleStartY + index * lineHeight;
        ctx.fillText(line, centerX, centerY - textHeight / 2, titleWidth);
    });

    // dev
    ctx.fillRect(centerX, 0, 1, height);

    // footer
    ctx.font = `300 40pt "BIZ UDGothic"`;
    const footerText = "stak.me";
    const iconRadius = 40;
    const centerY = height - mergin - footerHeight;
    const footerWidth =
        iconRadius * 2 + mergin + ctx.measureText(footerText).width;
    const footerStart = centerX - footerWidth / 2;
    ctx.textAlign = "left";

    console.log(
        "text",
        footerStart + iconRadius * 2 + mergin,
        centerY - textHeight / 2
    );
    ctx.fillText(
        footerText,
        footerStart + iconRadius * 2 + mergin,
        centerY - textHeight / 2,
        footerWidth
    );
    const icon = await loadImage("public/icon/icon.jpg");

    ctx.arc(
        footerStart + iconRadius,
        centerY,
        iconRadius,
        0,
        Math.PI * 2,
        true
    );
    ctx.clip();
    ctx.drawImage(
        icon,
        footerStart,
        centerY - iconRadius,
        iconRadius * 2,
        iconRadius * 2
    );

    // output
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./image.png", buffer);
};
