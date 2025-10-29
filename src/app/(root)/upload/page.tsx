'use client'
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ImagePlus, X } from "lucide-react";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { FormProp } from "@/src/types/upload-page";
import UploadPageImagePreview from "./components/image-preview";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GetCategory } from "@/src/api/services/category";
import { CategoryProp } from "@/src/types/category";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Upload() {
    const [categorys, setCategorys] = useState<CategoryProp[] | null>(null);
    const [preview, setPreview] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    console.log(selectedCategory)

    const form = useForm<FormProp>({
        defaultValues: {
            images: [],
            productName: '',
            price: '',
            stock: '',
            description: '',
        }
    });

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        form.setValue('images', files, { shouldValidate: true });
        const urls = files.map((image) => URL.createObjectURL(image));
        setPreview(urls);
    };

    const removePreviewImage = (index: number) => {
        const currentFiles = form.getValues("images") || [];
        const newFiles = currentFiles.filter((_, i) => i !== index);
        form.setValue("images", newFiles);
        const newPreviews = preview.filter((_, i) => i !== index);
        setPreview(newPreviews);
    };

    const clearPreview = () => {
        setPreview([]);
        form.setValue('images', []);
    };

    useEffect(() => {
        const getCategories = async () => {
            const res = await GetCategory();
            setCategorys(res);
        };
        getCategories();
    }, []);

    const selectCategoryFunc = (id: string) => {
        setSelectedCategory(id);
    };

    return (
        <div className="custom-width border rounded-xl p-5 my-5">
            <h1 className="text-xl font-bold text-gray-600 mb-2">Add Product</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <Form {...form}>
                    {/* images legft side */}
                    <div className="h-full w-full space-y-5">
                        <FormField control={form.control} name="images" render={({ field }) => (
                            <FormItem className={`${preview.length === 0 ? "h-full" : "h-auto"}`}>
                                <FormLabel>
                                    <label className={`h-full w-full border-2 border-dashed border-violet-300 rounded-lg flex flex-col items-center justify-center p-10 cursor-pointer hover:border-violet-500 transition`}>

                                        <ImagePlus className="h-12 w-12 text-gray-400 mb-3" />

                                        <p className="text-gray-500">
                                            Drop your files here. or{" "}
                                            <span className="text-violet-500 cursor-pointer">Browse</span>
                                        </p>

                                        {/* upload input  */}
                                        <Input
                                            multiple
                                            onChange={handleImage}
                                            className="hidden"
                                            type="file"
                                            id="imagesInput"
                                        />

                                    </label>

                                </FormLabel>
                            </FormItem>
                        )}>
                        </FormField>

                        <ul className="grid grid-cols-3 gap-2">
                            {
                                preview.map((img: string, id: number) => (
                                    <UploadPageImagePreview key={id} image={img} id={id} removePreviewImage={removePreviewImage} />
                                ))
                            }

                        </ul>
                        {
                            preview.length > 1 &&
                            <p onClick={clearPreview} className="text-red-700 underline cursor-pointer hover:text-red-500">clear</p>
                        }
                    </div>

                    {/* images right  */}
                    <div className="space-y-3">

                        {/* product name  */}
                        <FormField control={form.control} name="productName" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="grid">
                                    <p>Product name:</p>
                                    <Input type="text" placeholder="Logitech MX Keys Combo, Logitech MX Klaviaturasi" />
                                </FormLabel>
                            </FormItem>
                        )}>
                        </FormField>

                        {/* product price  */}
                        <FormField control={form.control} name="productName" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="grid grid-col-1">
                                    <p>Price:</p>
                                    <Input type="number" placeholder="220 000" />
                                </FormLabel>
                            </FormItem>
                        )}>
                        </FormField>

                        {/* product stock  */}
                        <FormField control={form.control} name="productName" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="grid grid-col-1">
                                    <p>Stock:</p>
                                    <Input type="number" placeholder="6" />
                                </FormLabel>
                            </FormItem>
                        )}>
                        </FormField>

                        {/* product stock  */}
                        <FormField control={form.control} name="productName" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="grid grid-col-1">
                                    <p>Description:</p>
                                    <Textarea className="max-h-[100px]" rows={3} placeholder="Barmoqlaringiz uchun maxsus moʻljallangan sferik tugmachalar yordamida ishonchli va tezlikda silliq ..." />
                                </FormLabel>
                            </FormItem>
                        )}>
                        </FormField>

                        {/* tags  */}
                        <div className="space-y-2">
                            <p className="text-sm font-semibold">Choose category</p>
                            <ul className="flex flex-wrap gap-1 select-none">

                                {
                                    categorys?.map((category: CategoryProp) => (
                                        <li onClick={() => selectCategoryFunc(category.id)} key={category.id} className={`${selectedCategory == category.id ? "bg-violet-700 text-white" : "bg-gray-300 text-gray-600"}  py-0.5 px-3 rounded-2xl flex items-center gap-2`}>
                                            <span>{category.name}</span>
                                            {category.id === selectedCategory && <span><X size={15} /></span>}
                                        </li>
                                    ))
                                }
                            </ul>
                            <p>You can't find correct category. <Link className="underline text-blue-700 " href={'/user/category'}>create one</Link></p>
                        </div>

                        {/* supmit button  */}
                        <div className="w-full flex justify-center cursor-pointer">
                            <Button className="bg-violet-700 hover:bg-violet-500 px-15">create</Button>
                        </div>
                    </div>

                </Form>
            </div>
        </div>
    )
}