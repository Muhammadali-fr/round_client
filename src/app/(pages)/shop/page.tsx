'use client'

import Card from "@/src/components/Card";
import ProductLoaderSkeleton from "@/src/components/loaders/ProductLoaderSkeleton";
import ProductsNotFound from "@/src/components/not-found/Product-not-found";
import { ProductProp } from "@/src/types/user";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function ShopPage() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSearchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/product?search=${query}`, {
          method: 'GET'
        });
        const { products, success } = await res.json();
        if (success) {
          setProducts(products);
        }
      } catch (error) {
        console.log(error);
      } finally { setLoading(false) };
    };
    getSearchProducts();
  }, [query]);

  return (
    <div className="custom-width py-5 space-y-5">
      <div>
        <label className="relative">
          <Search className="absolute -top-[2px] left-3 text-gray-400" />
          <input onChange={e => setQuery(e.target.value.trim())} value={query} type="text" autoFocus className="border border-violet-400 w-full p-2 pl-10 rounded-lg" placeholder="Search for products..." />
        </label>
      </div>

      <div className="space-y-5">
        <p className="text-2xl font-semibold">Products</p>
        {loading ?
          <ProductLoaderSkeleton /> :
          products.length === 0 ?
            <ProductsNotFound />
            :
            <ul className="grid grid-cols-4 gap-5">
              {
                products.map((item: ProductProp) => (
                  <Card key={item.id} item={item} />
                ))
              }
            </ul>
        }

      </div>
    </div>
  )
}