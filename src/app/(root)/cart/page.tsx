'use client'

// next and react 
import { Button } from "@/components/ui/button";
import { RootState } from "@/src/lib/store";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function Cart() {

    const cart = useSelector((state:RootState) => state.userCart.data);

    return (
        <section className="custom-width p-5 flex flex-col gap-5">
            <p className="text-2xl font-semibold">Shopping Cart</p>
            <div className=" flex justify-between gap-2">
                {/* left  */}
                <ul className="w-[70%] flex flex-col gap-5 border rounded-xl p-5">
                    <li className="flex items-center justify-between gap-5">
                        <Image className="w-[200px] h-[100px] object-cover object-top rounded-lg" width={150} height={150} src={'https://round-records.s3.us-east-1.amazonaws.com/dbb75f5a-0bdf-4f0f-9f75-18ade2d1d411.webp'} alt={`Super qahramonlar kostyumi, bolalar uchun kyim " Superman", "Batman", "Xalk" qahramonlar`} />
                        <p>Super qahramonlar kostyumi, bolalar uchun kyim "Superman", "Batman", "Xalk" qahramonlar</p>
                        {/* cart quantity buttons */}
                        <div className="flex items-center justify-center gap-3 ">
                            <button className="p-2 cursor-pointer rounded-full border hover:bg-gray-200"><Minus size={18} className="text-gray-600" /></button>
                            <p className="text-[16px] text-gray-600">1</p>
                            <button title="add one same product" className="p-2 cursor-pointer rounded-full border hover:bg-gray-200"><Plus size={18} className="text-gray-600" /></button>
                        </div>

                        <div title="delete" className="bg-white p-2 border rounded-full text-red-500 cursor-pointer hover:bg-red-100" >
                            <Trash2 size={20} />
                        </div>

                    </li>

                    <li className="flex items-center justify-between gap-5 border-t pt-5">
                        <Image className="w-[200px] h-[100px] object-cover object-top rounded-lg" width={150} height={150} src={'https://round-records.s3.us-east-1.amazonaws.com/dbb75f5a-0bdf-4f0f-9f75-18ade2d1d411.webp'} alt={`Super qahramonlar kostyumi, bolalar uchun kyim " Superman", "Batman", "Xalk" qahramonlar`} />
                        <p>Super qahramonlar kostyumi, bolalar uchun kyim "Superman", "Batman", "Xalk" qahramonlar</p>
                        {/* cart quantity buttons */}
                        <div className="flex items-center justify-center gap-3 ">
                            <button className="p-2 cursor-pointer rounded-full border hover:bg-gray-200"><Minus size={18} className="text-gray-600" /></button>
                            <p className="text-[16px] text-gray-600">1</p>
                            <button title="add one same product" className="p-2 cursor-pointer rounded-full border hover:bg-gray-200"><Plus size={18} className="text-gray-600" /></button>
                        </div>

                        <div title="delete" className="bg-white p-2 border rounded-full text-red-500 cursor-pointer hover:bg-red-100" >
                            <Trash2 size={20} />
                        </div>
                    </li>
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