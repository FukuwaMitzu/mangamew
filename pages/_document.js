import {Head, Html, NextScript , Main} from "next/document";

export default function Document(){
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://api.mangadex.org"></link>
                <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
            </Head>
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    )
}
