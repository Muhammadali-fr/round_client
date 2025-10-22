'use client'
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function Upload() {

    const [category, setCategory] = useState(null);

    const form = useForm({
        defaultValues: {
            images: [],
            productName: '',
            price: '',
            stock: '',
            description: '',
        }
    })

    return (
        <div className="custom-width border rounded-xl p-5">
            <h1 className="text-xl font-bold text-gray-600 mb-2">Add Product</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <Form {...form}>
                    {/* images  */}
                    <div>
                        <FormField control={form.control} name="images" render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <label className={`${images.length === 0 ? "h-full" : "h-auto"} border-2 border-dashed border-violet-300 rounded-lg flex flex-col items-center justify-center p-10 cursor-pointer hover:border-violet-500 transition`}>

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
                    </div>


                </Form>
            </div>
        </div>
    )
}