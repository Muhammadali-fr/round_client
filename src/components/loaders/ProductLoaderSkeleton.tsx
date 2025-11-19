// hero ui 
import { Skeleton } from "@/components/ui/skeleton"

const ProductLoaderSkeleton = () => {
    return (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            <li className="w-full h-[415px] flex flex-col space-y-3">
                <Skeleton className="h-[85%] w-full rounded-xl bg-gray-200" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-[80%] bg-gray-200" />
                </div>
            </li>

            <li className="w-full h-[415px] flex flex-col space-y-3">
                <Skeleton className="h-[85%] w-full rounded-xl bg-gray-200" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-[80%] bg-gray-200" />
                </div>
            </li>

            <li className="w-full h-[415px] flex flex-col space-y-3">
                <Skeleton className="h-[85%] w-full rounded-xl bg-gray-200" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-[80%] bg-gray-200" />
                </div>
            </li>

            <li className="w-full h-[415px] flex flex-col space-y-3">
                <Skeleton className="h-[85%] w-full rounded-xl bg-gray-200" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-[80%] bg-gray-200" />
                </div>
            </li>

            <li className="w-full h-[415px] flex flex-col space-y-3">
                <Skeleton className="h-[85%] w-full rounded-xl bg-gray-200" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-[80%] bg-gray-200" />
                </div>
            </li>

            <li className="w-full h-[415px] flex flex-col space-y-3">
                <Skeleton className="h-[85%] w-full rounded-xl bg-gray-200" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-[80%] bg-gray-200" />
                </div>
            </li>

            <li className="w-full h-[415px] flex flex-col space-y-3">
                <Skeleton className="h-[85%] w-full rounded-xl bg-gray-200" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-[80%] bg-gray-200" />
                </div>
            </li>

            <li className="w-full h-[415px] flex flex-col space-y-3">
                <Skeleton className="h-[85%] w-full rounded-xl bg-gray-200" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-[80%] bg-gray-200" />
                </div>
            </li>

        </ul>
    )
}

export default ProductLoaderSkeleton;