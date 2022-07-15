import { DocumentProps, Html, Main, NextScript, Head } from "next/document";
import { FC } from "react";

const MyDocument: FC<DocumentProps> = () => {
    const googleFonts = [
        "M+PLUS+Rounded+1c:wght@300",
        "BIZ+UDGothic",
        "Roboto:wght@400",
        "Roboto+Mono",
    ];
    return (
        <Html>
            <Head>
                {googleFonts.map((font, i) => (
                    <link
                        key={i}
                        href={`https://fonts.googleapis.com/css2?family=${font}&display=auto`}
                        rel="stylesheet"
                    />
                ))}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default MyDocument;
