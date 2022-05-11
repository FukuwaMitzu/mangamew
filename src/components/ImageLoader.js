import { Fragment, useState } from "react";
import Loading from "./Loading";

export default function ImageLoader({ src }) {
    const [loading, setLoading] = useState(true);
    return (
        <Fragment>
            {
                loading &&
                <div className="h-80">
                    <Loading></Loading>
                </div>
            }
            <img className={`${loading? "opacity-0":""}`} src={src} onLoad={() => { setLoading(false) }} loading="lazy"></img>
        </Fragment>
    );
}