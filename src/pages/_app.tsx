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
