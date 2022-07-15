import { DocumentProps, Html, Main, NextScript, Head } from "next/document";
import { FC } from "react";

const MyDocument: FC<DocumentProps> = () => {
    return (
        <Html>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300&display=optional"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default MyDocument;
