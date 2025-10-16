import ProductLoaderSkeleton from "@/src/components/loaders/ProductLoaderSkeleton";

export default function Loading() {
    return (
        <div className="custom-width py-5 space-y-5">
            <div className="bg-gray-200 w-full h-[400px] rounded-lg"></div>
            <ProductLoaderSkeleton />
        </div>
    )
}