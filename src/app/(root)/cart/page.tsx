'use client'

// next and react 
import Image from "next/image";

// components 
import { Button } from "@/components/ui/button";

// redux 
import { useSelector } from "react-redux";
import { RootState } from "@/src/lib/store";

// types and interfaces 
import { CartItemProp } from "@/src/types/cart-item";

// lucide icons
import { Minus, Plus, Trash2 } from "lucide-react";

export default function Cart() {

    const cart = useSelector((state: RootState) => state.userCart.data);

    return (
        <section className="custom-width p-5 flex flex-col gap-5">
            <p className="text-2xl font-semibold">Shopping Cart</p>
            <div className=" flex justify-between gap-2">
                {/* left  */}
                <ul className="w-[70%] flex flex-col gap-5 border rounded-xl p-5">
                    {
                        cart.map((item: CartItemProp, i:number) => (
                            <li key={item.id} className={`flex items-center justify-between gap-5 ${i === 0 ? 'border-none' : 'border-t pt-5'}`}>
                                <Image
                                    src={item.product.image}
                                    alt={item.product.name}
                                    width={100}
                                    height={100}
                                    className="object-cover object-top rounded-lg"
                                />
                                <p>{item.product.name}</p>
                                {/* cart quantity buttons */}
                                <div className="flex items-center justify-center gap-3 ">
                                    <button className="p-2 cursor-pointer rounded-full border hover:bg-gray-200"><Minus size={18} className="text-gray-600" /></button>
                                    <p className="text-[16px] text-gray-600">{item.quantity}</p>
                                    <button title="add one same product" className="p-2 cursor-pointer rounded-full border hover:bg-gray-200"><Plus size={18} className="text-gray-600" /></button>
                                </div>

                                <div title="delete" className="bg-white p-2 border rounded-full text-red-500 cursor-pointer hover:bg-red-100" >
                                    <Trash2 size={20} />
                                </div>

                            </li>
                        ))
                    }
                </ul>

                {/* right  */}
                <div className="w-[30%] bg-white border rounded-lg p-5 flex flex-col gap-4">

                    <p className="text-xl font-semibold">Order Summary</p>

                    <div className="flex flex-col gap-3 text-[15px]">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium">$120.00</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-600">Shipping</span>
                            <span className="font-medium">$5.00</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-600">Tax</span>
                            <span className="font-medium">$2.00</span>
                        </div>
                    </div>

                    <hr />

                    <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>$127.00</span>
                    </div>

                    <Button className="bg-violet-700 hover:bg-violet-600">Proceed to Checkout</Button>
                </div>
            </div>
        </section>
    );
};