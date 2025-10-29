export default function Loading() {
    return (
        <div className="custom-width animate-pulse space-y-5 py-5">
            {/* Main Product Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Image placeholder */}
                <div className="w-full h-[500px] bg-gray-200 rounded-lg" />

                {/* Right: Details placeholder */}
                <div className="space-y-4">
                    <div className="h-8 w-2/3 bg-gray-200 rounded" />
                    <div className="flex items-center justify-between">
                        <div className="h-6 w-24 bg-gray-200 rounded" />
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-full" />
                            <div className="h-6 w-6 bg-gray-200 rounded" />
                            <div className="w-8 h-8 bg-gray-200 rounded-full" />
                        </div>
                        <div className="h-10 w-32 bg-gray-200 rounded" />
                    </div>

                    <div className="space-y-2">
                        <div className="h-5 w-1/3 bg-gray-200 rounded" />
                        <div className="h-20 w-full bg-gray-200 rounded" />
                    </div>
                </div>
            </div>

            {/* Related products section */}
            <section className="space-y-4">
                <div className="h-6 w-48 bg-gray-200 rounded" />
                <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <li
                            key={i}
                            className="w-full h-[300px] bg-gray-200 rounded-lg"
                        />
                    ))}
                </ul>
            </section>
        </div>
    );
}
