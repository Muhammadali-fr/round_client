
// components 
import ShopPageProducts from "./components/Products";
import ShopPageSearch from "./components/Search";
import ProductLoaderSkeleton from "@/src/components/loaders/ProductLoaderSkeleton";

// next and react 
import { Suspense } from "react";

export default async function ShopPage({ searchParams }: { searchParams: { query: string, page: string } }) {

  const { query } = await searchParams;

  return (
    <div className="custom-width py-5 space-y-5">
      <ShopPageSearch />
      <Suspense fallback={
        <ProductLoaderSkeleton />
      }>
        <ShopPageProducts query={query} />
      </Suspense>
    </div>
  )
};