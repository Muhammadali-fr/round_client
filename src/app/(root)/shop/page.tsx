'use client'

// react or next 
import { useEffect, useState } from "react";


// component 
import { Input } from "@/components/ui/input";
import Card from "@/src/components/Card";
import ProductLoaderSkeleton from "@/src/components/loaders/ProductLoaderSkeleton";
import ProductsNotFound from "@/src/components/not-found/Product-not-found";

// types 
import { ProductProp } from "@/src/types/product";

// sercices 
import { getProducts } from "@/src/api/services/products";

// lucide react 
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function ShopPage() {
  const [query, setQuery] = useState<string>('');
  const [debauncedQuery, setDebauncedQuery] = useState<string>('');

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebauncedQuery(query);
    }, 500)
    return () => clearTimeout(delay);
  }, [query]);

  const { data, isPending, error } = useQuery({
    queryKey: ['product', debauncedQuery],
    queryFn: () => getProducts(debauncedQuery),
  });

  return (
    <div className="custom-width py-5 space-y-5">
      <div>
        <label className="relative">
          <Search className="absolute -top-[2px] left-3 text-gray-400" />
          <Input onChange={e => setQuery(e.target.value)} value={query} type="text" autoFocus className="border border-violet-400 w-full p-2 pl-10 rounded-lg outline-none outline-violet-700" placeholder="Search for products..." />
        </label>
      </div>

      <div className="space-y-5">
        <p className="text-2xl font-semibold">Products</p>
        {isPending ? (
          <ProductLoaderSkeleton />
        ) : !data?.products?.length ? (
          <ProductsNotFound />
        ) : (

          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {
              data?.products?.map((item: ProductProp) => (
                <Card key={item.id} item={item} />
              ))
            }
          </ul>
        )}
      </div>
    </div>
  )
};