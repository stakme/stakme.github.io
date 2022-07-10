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

interface ImageSpec {
    width: number;
    height: number;
    footerHeight: number;
    padding: number;
}

const background: (canvas: Canvas, spec: ImageSpec) => void = (
    canvas,
    { padding }
) => {
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

const debug: (canvas: Canvas, spec: ImageSpec) => void = (
    canvas,
    { width, height, padding, footerHeight }
) => {
    const ctx = canvas.getContext("2d");

    interface Point {
        x: number;
        y: number;
    }

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
    // drawLine({ x: 0, y: height / 2 }, { x: width, y: height / 2 });
    drawLine(
        titleStart,
        { x: titleStart.x, y: height - padding },
        { x: width - padding, y: height - padding },
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
    drawLine(footerStart, { x: padding + contentWidth, y: footerStart.y });
    drawLine(
        { x: padding, y: (height - footerHeight) / 2 },
        { x: width - padding, y: (height - footerHeight) / 2 }
    );
};

const title: (canvas: Canvas, spec: ImageSpec, text: string) => void = (
    canvas,
    { width, height, footerHeight, padding },
    text
) => {
    const ctx = canvas.getContext("2d");
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

    const titleCenterY = (height - footerHeight) / 2;
    const titleStartY = titleCenterY - (lineHeight * lines.length) / 2;
    const titleWidth = width - padding * 2;
    const centerX = width / 2;
    lines.forEach((line, index) => {
        const centerY = titleStartY + index * lineHeight;
        ctx.fillText(line, centerX, centerY, titleWidth);
    });
};

const footer: (canvas: Canvas, spec: ImageSpec) => Promise<void> = async (
    canvas,
    { width, height, padding, footerHeight }
) => {
    const ctx = canvas.getContext("2d");
    ctx.font = `300 40pt "BIZ UDGothic"`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = ogTextColor;

    const iconRadius = 40;
    const mergin = iconRadius / 2;
    const centerX = width / 2;
    const centerY = height - padding - footerHeight / 2;

    const url = "stak.me";
    const { width: urlWidth } = ctx.measureText(url);

    const footerWidth = iconRadius * 2 + mergin + urlWidth;
    const footerStart = centerX - footerWidth / 2;
    ctx.fillText(url, footerStart + iconRadius * 2 + mergin, centerY, urlWidth);
    const icon = await loadImage("public/icon/icon.jpg");

    ctx.beginPath();
    ctx.arc(
        footerStart + iconRadius,
        centerY,
        iconRadius,
        0,
        Math.PI * 2,
        true
    );
    ctx.closePath();
    ctx.save();
    ctx.clip();
    ctx.drawImage(
        icon,
        footerStart,
        centerY - iconRadius,
        iconRadius * 2,
        iconRadius * 2
    );
    ctx.rect(0, 0, width, height);
    ctx.restore();
};

export const createImage: (text: string) => void = async (text) => {
    const spec: ImageSpec = {
        width: 1200,
        height: 600,
        footerHeight: 550 / 4,
        padding: 25,
    };
    const canvas = createCanvas(spec.width, spec.height);
    const ctx = canvas.getContext("2d");

    background(canvas, spec);
    // debug(canvas, spec);
    await footer(canvas, spec);
    title(canvas, spec, text);

    // output
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./image.png", buffer);
};
