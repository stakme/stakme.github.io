import {
    createCanvas,
    registerFont,
    loadImage,
    Canvas,
    NodeCanvasRenderingContext2DSettings,
} from "canvas";
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
        centerX: number;
        centerY: number;
        radius: number;
    };
    url: {
        text: string;
        x: number;
        y: number;
        width: number;
    };
}

interface Point {
    x: number;
    y: number;
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
            centerX: footerStart + radius,
            centerY: centerY,
            radius,
        },
        url: {
            text: url,
            x: footerStart + radius * 2 + mergin,
            y: Math.floor(centerY - urlHeight / 2),
            width: urlWidth,
        },
    };
};

const width = 1200;
const height = 600;
const footerHeight = 170;
const padding = 25;

const background: (canvas: Canvas) => void = (canvas) => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = ogBackground;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(
        padding,
        padding,
        canvas.width - padding * 2,
        canvas.height - padding * 2
    );
};

const debug: (canvas: Canvas) => void = (canvas) => {
    const ctx = canvas.getContext("2d");

    const drawLine: (...points: Point[]) => void = (...points) => {
        ctx.beginPath();
        const start = points.shift();
        if (!start) return;

        ctx.moveTo(start.x, start.y);
        for (const point of points) {
            ctx.lineTo(point.x, point.y);
        }
        ctx.stroke();
    };
    const contentWidth = width - padding * 2;
    const titleStart: Point = { x: padding, y: padding };
    const footerStart: Point = {
        x: padding,
        y: height - padding - footerHeight,
    };
    drawLine({ x: width / 2, y: 0 }, { x: width / 2, y: height });
    drawLine({ x: 0, y: height / 2 }, { x: width, y: height / 2 });
    drawLine(
        titleStart,
        footerStart,
        {
            x: titleStart.x + contentWidth,
            y: footerStart.y,
        },
        {
            x: titleStart.x + contentWidth,
            y: titleStart.y,
        },
        titleStart
    );
    drawLine(
        footerStart,
        { x: footerStart.x, y: height - padding },
        { x: footerStart.x + contentWidth, y: height - padding },
        { x: padding + contentWidth, y: footerStart.y }
    );
};

export const createImage: (text: string) => void = async (text) => {
    // canvas
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // background
    background(canvas);

    debug(canvas);

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

    // footer
    ctx.font = `300 40pt "BIZ UDGothic"`;
    const iconRadius = 40;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    const fp = footerPosition(
        canvas,
        "stak.me",
        '300 40pt "BIZ UDGothic',
        60,
        40
    );
    ctx.fillText(fp.url.text, fp.url.x, fp.url.y, fp.url.width);
    const icon = await loadImage("public/icon/icon.jpg");

    ctx.beginPath();
    ctx.arc(fp.icon.centerX, fp.icon.centerY, iconRadius, 0, Math.PI * 2, true);
    ctx.clip();
    ctx.drawImage(icon, fp.icon.x, fp.icon.y, iconRadius * 2, iconRadius * 2);

    // output
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./image.png", buffer);
};
