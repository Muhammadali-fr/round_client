"use client";

// react and next
import Link from "next/link";
import { useState } from "react";

// lucide 
import { PackagePlus, Pencil, Trash2 } from "lucide-react";

// redux
import { RootState } from "@/src/lib/store";
import { useSelector, useDispatch } from "react-redux";
import { removeUserProduct, setUserProducts } from "@/src/lib/features/userProducts";

// animations  and loader or toast
import EmptyAnimations from "@/public/animations/empty-not-found.json";
import LottieAnimation from "@/src/components/animations/LottieAnimation";
import toast from "react-hot-toast";
import ButtonLoader from "@/src/components/loaders/ButtonLoader";

// components 
import Modal from "@/src/components/Modal";

// services 
import { deleteProduct } from "@/src/api/services/products";

// types and interfaces 
import { ProductProp } from "@/src/types/product";
import Image from "next/image";

export default function Products() {
    // states 
    const [openModal, setOpenModal] = useState<Boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [deleteLoader, setDeleteLoader] = useState<Boolean>(false);

    // redux 
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.data);
    const userProducts = useSelector((state: RootState) => state.userProducts.data);

    // functions 
    const handle_delete = async () => {
        if (!selectedProduct) {
            return toast('We cant find product.');
        }
        setDeleteLoader(true);
        try {
            const res = await deleteProduct(selectedProduct);
            dispatch(removeUserProduct(selectedProduct));
            setOpenModal(false);
            toast.success(res.message);
        } catch (r: any) {
            toast(r?.response?.data.message || "deleting failed.");
            console.log(r);
        } finally { setDeleteLoader(false) };
    }

    // checking user 
    if (!user || !user.products || user.products.length === 0) {
        return (
            <div className="w-full h-screen flex items-center justify-center flex-col">
                <LottieAnimation
                    animationData={EmptyAnimations}
                    loop={true}
                    className="w-[320px] h-[320px]"
                />
                <Link href={'/upload'}><p className="text-lg">No Products yet</p></Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold mb-6 text-violet-800 flex items-top gap-2">Your Products <p className="text-sm">({user.products.length})</p></h1>

                {/* new button  */}
                <Link href={'/upload'}>
                    <button className="py-1 px-5 bg-violet-700 text-white rounded-lg flex items-center justify-center gap-1 hover:bg-violet-500 cursor-pointer"> <PackagePlus size={17} /> new</button>
                </Link>
            </div>

            <div className="grid grid-cols-5 gap-3">
                {/* card  */}
                {
                    userProducts?.map((product: ProductProp) => (
                        <div key={product.id} className="w-full h-[400px] bg-white rounded-lg flex items-center justify-between flex-col p-1 gap-2 relative" >
                            <Link className="h-[90%]" href={`/product/${product.id}`}>

                                {/* image  */}
                                {/* <img className="w-full h-[90%] rounded-lg" src={product.image} alt={product.name} /> */}
                                <Image width={200} height={200} className="w-full h-[90%] rounded-lg" src={product.image} alt={product.name}/>

                                {/* name  */}
                                <p className="line-clamp-2 text-sm">{product.name}</p>
                            </Link>

                            {/* edit button  */}
                            <Link className="w-full" href={`/edit/${product.id}`}><button className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white py-1 rounded-lg cursor-pointer hover:bg-blue-500"><Pencil size={14} />edit</button> </Link>

                            {/* delete button  */}
                            <div onClick={() => { setOpenModal(true); setSelectedProduct(product.id) }
                            } title="delete" className="bg-white p-2 border rounded-full text-red-500 cursor-pointer hover:bg-red-100 absolute top-3 right-3" >
                                <Trash2 size={20} />
                            </div>
                        </div>
                    ))
                }

                {/* modal  */}
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <div className="text-center space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800">Ready to delete?</h2>
                        <p className="text-sm text-gray-600">
                            You’re about to this product. Are you sure you want to continue?
                        </p>
                        <div className="flex justify-center gap-2">
                            <button
                                onClick={handle_delete}
                                className="w-[50%] h-[40px] rounded-lg text-white bg-red-500 hover:bg-red-400 cursor-pointer flex items-center justify-center"
                            >
                                {deleteLoader ? <ButtonLoader /> : "delete"}
                            </button>
                        </div>
                    </div>
                </Modal>
            </div >
        </div >
    );
}
