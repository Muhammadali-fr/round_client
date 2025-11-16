
export default function AddToCartButton({ productId }: { productId: string }) {

    return (
        <button className="w-full py-1 bg-violet-700 text-white rounded-lg cursor-pointer hover:bg-violet-600 active:bg-violet-800">add to cart</button>
    );
};