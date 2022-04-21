import {Head, Html, NextScript , Main} from "next/document";

export default function Document(){
    return (
        <Html>
            <Head>
                <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp&display=swap" rel="stylesheet" />
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            </Head>
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    )
}
