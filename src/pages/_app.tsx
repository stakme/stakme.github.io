import { FC, useEffect } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "../utils/ga";
import { useRouter } from "next/router";

const App: FC<AppProps> = ({ Component, pageProps }) => {
    const router = useRouter();
    useEffect(() => {
        const handler: (path: string) => void = (path) => {
            if (GA_MEASUREMENT_ID) {
                window.gtag("config", GA_MEASUREMENT_ID, { page_path: path });
            }
        };
        router.events.on("routeChangeComplete", handler);
        return () => {
            router.events.off("routeChangeComplete", handler);
        };
    }, [router.events]);

    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">{`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_MEASUREMENT_ID}');
                `}</Script>
            <Component {...pageProps} />;
        </>
    );
};

export default App;
