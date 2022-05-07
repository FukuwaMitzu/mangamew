import Link from "next/link";
import Button from "../src/components/Button";
export default function NotFound() {
    return (
        <>
            <div className="flex flex-col pt-10 sm:flex-row gap-5">
                <div className="text-center flex flex-col justify-center">
                    <h1 className="font-bold text-6xl">404</h1>
                    <h2 className="font-bold">oopsie woopsie!</h2>
                    <p className="mt-5 mb-5">
                        Uwu We made <span className="font-bold text-primary">afucky wucky!!</span> A wittle <span className="font-bold text-primary">fucko boingo!</span> The code monkeys at our HQ are working <span className="font-bold text-primary">VEWY HAWD</span> to fix this!
                    </p>
                    <Link href="/">
                        <a className="mx-auto my-5 block w-fit">
                            <Button>Go to home page</Button>
                        </a>
                    </Link>
                </div>  
                <div className="max-h-screen w-full max-w-xl">
                    <video autoPlay muted loop>
                        <source src="/media/uwu.mp4" type="video/mp4"></source>
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </>

    )
}