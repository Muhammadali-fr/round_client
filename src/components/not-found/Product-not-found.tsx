import Link from "next/link";
import LottieAnimation from "../animations/LottieAnimation";
import EmptyAnimationJson from '@/public/animations/empty-not-found.json';

export default function ProductsNotFound() {
    return (
        <div className="flex items-center justify-center flex-col ">
            <LottieAnimation
                animationData={EmptyAnimationJson}
                loop={true}
                className="w-[320px] h-[320px]"
            />
            <Link href={'/upload'}><p className="text-lg">No Products found</p></Link>
        </div>
    )
}