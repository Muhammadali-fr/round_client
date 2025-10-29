'use client'

// animation 
import LottieAnimation from "@/src/components/animations/LottieAnimation"
import ConnectionErrorAnimation from '@/public/animations/connectionError.json';

export default function ErrorPage({ error, reset }: { error: Error, reset: () => void }) {

    console.log(error);

    return (

        <div className="custom-width h-[90vh] flex flex-col items-center justify-center gap-6 relative">

            {/* Title */}
            <p className="text-lg font-medium text-gray-700 relative top-15">
                Oops! Check your connection
            </p>

            {/* Animation */}
            <LottieAnimation
                animationData={ConnectionErrorAnimation}
                loop={true}
                className="w-[220px] h-[220px]"
            />

            {/* Try Again Button */}
            <button
                onClick={() => reset()}
                className="rounded-xl py-2 px-8 text-white bg-violet-600 hover:bg-violet-700 active:scale-95 transition-all z-10 cursor-pointer"
            >
                Try Again
            </button>
        </div>
    )
}