import Image from "next/image";
export default function Loading() {
    return (
        <div className="text-center flex justify-center py-3">
            <Image src="/images/loading.svg" alt="loading" width={35} height={35}/>
        </div>
    )
}