
// next and react 
import { Minus, Plus } from "lucide-react";
import Image from "next/image";

export default function Cart() {
    return (
        <div className="custom-width p-5 flex justify-between gap-2">
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
                </li>

                <li className="flex items-center justify-between gap-5">
                    <Image className="w-[200px] h-[100px] object-cover object-top rounded-lg" width={150} height={150} src={'https://round-records.s3.us-east-1.amazonaws.com/dbb75f5a-0bdf-4f0f-9f75-18ade2d1d411.webp'} alt={`Super qahramonlar kostyumi, bolalar uchun kyim " Superman", "Batman", "Xalk" qahramonlar`} />
                    <p>Super qahramonlar kostyumi, bolalar uchun kyim "Superman", "Batman", "Xalk" qahramonlar</p>
                    {/* cart quantity buttons */}
                    <div className="flex items-center justify-center gap-3 ">
                        <button className="p-2 cursor-pointer rounded-full border hover:bg-gray-200"><Minus size={18} className="text-gray-600" /></button>
                        <p className="text-[16px] text-gray-600">1</p>
                        <button title="add one same product" className="p-2 cursor-pointer rounded-full border hover:bg-gray-200"><Plus size={18} className="text-gray-600" /></button>
                    </div>
                </li>
            </ul>

            {/* right  */}
            <div className="w-[30%]"></div>
        </div>
    );
};