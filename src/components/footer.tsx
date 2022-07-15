import { FC } from "react";
import { TextLink } from "./link";

export const Footer: FC = () => {
    return (
        <footer className="mt-8 mb-20 border-t-2 pt-4 ">
            <p>
                このサイトはGoogleアナリティクスを利用し、お使いのウェブブラウザから特定の情報を収集します。
                <TextLink href="https://policies.google.com/technologies/partner-sites">
                    データが収集、処理される仕組みについて (Google提供サイト)
                </TextLink>
            </p>
        </footer>
    );
};
