
// tanstack
import { useMutation } from "@tanstack/react-query";

// services 
import { addToCart } from "../api/services/cart";

// loader and toasts 
import toast from "react-hot-toast";
import ButtonLoader from "./loaders/ButtonLoader";

export default function AddToCartButton({ productId }: { productId: string }) {

    const addToCartMuatation = useMutation({
        mutationFn: async () => {
            return await addToCart({ productId });
        },
        onSuccess: (res) => {
            toast.success(res.message || 'Item added to cart successfully.');
        },
        onError: (error) => {
            toast.error(error.message || 'Something went wrong, pleaser reload page.');
        },
    });

    return (
        <button disabled={addToCartMuatation.isPending} onClick={async () => await addToCartMuatation.mutateAsync()} className={`${addToCartMuatation.isPending ? "bg-violet-900" : "bg-violet-700 hover:bg-violet-600 active:bg-violet-800"} w-full h-[35px] flex items-center justify-center text-white rounded-3xl cursor-pointer`}>
            {addToCartMuatation.isPending ?
                <ButtonLoader /> :
                "add to cart"
            }
        </button>
    );
};