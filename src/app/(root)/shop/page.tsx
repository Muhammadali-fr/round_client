'use client'


import ShopPageProducts from "./components/products";

export default function ShopPage() {



  return (
    <div className="custom-width py-5 space-y-5">
      
      

      <div className="space-y-5">
        <p className="text-2xl font-semibold">Products</p>
        <ShopPageProducts />
      </div>
    </div>
  )
};