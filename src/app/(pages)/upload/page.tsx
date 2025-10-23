'use client'
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { ImagePlus } from "lucide-react";
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FormProp } from "@/src/types/upload-page";
import Image from "next/image";
import UploadPageImagePreview from "./components/image-preview";

export default function Upload() {

    const [category, setCategory] = useState(null);
    const [preview, setPreview] = useState<string[]>([]);

    const form = useForm<FormProp>({
        defaultValues: {
            images: [],
            productName: '',
            price: '',
            stock: '',
            description: '',
        }
    })

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

    return (
        <div className="custom-width border rounded-xl p-5 my-5">
            <h1 className="text-xl font-bold text-gray-600 mb-2">Add Product</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <Form {...form}>
                    {/* images legft side */}
                    <div className="h-full w-full space-y-5">
                        <FormField control={form.control} name="images" render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <label className={`${preview.length === 0 ? "h-full" : "h-auto"} w-full border-2 border-dashed border-violet-300 rounded-lg flex flex-col items-center justify-center p-10 cursor-pointer hover:border-violet-500 transition`}>

                                        <ImagePlus className="h-12 w-12 text-gray-400 mb-3" />

                                        <p className="text-gray-500">
                                            Drop your files here. or{" "}
                                            <span className="text-violet-500 cursor-pointer">Browse</span>
                                        </p>

                                        {/* upload input  */}
                                        <input
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

                    </div>


                </Form>
            </div>
        </div>
    )
}