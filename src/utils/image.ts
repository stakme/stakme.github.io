import { imageSize } from "image-size";

export interface ImageDetail {
    path: string;
    width: number;
    height: number;
}

export const getImageDetail: (path: string) => ImageDetail = (path) => {
    const { width, height } = imageSize(`./public/${path}`);
    return { path, width: width ?? 0, height: height ?? 0 };
};
