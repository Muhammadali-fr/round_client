'use client'

// components 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCategory } from "@/src/api/services/category";
import ButtonLoader from "@/src/components/loaders/ButtonLoader";

// tanstack 
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function CategoryCreate() {

    const createCategoryMutataion = useMutation({
        mutationFn: async (data: { name: string }) => {
            return await createCategory(data);
        },
        onSuccess: (res: { name: string, id: string }) => {
            toast.success(`${res.name} created successfully`);
        },
    });

    const form = useForm({
        defaultValues: {
            category: '',   
        },
        onSubmit: async ({ value }) => {
            await createCategoryMutataion.mutateAsync({ name: value.category });
        },
    });

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-[400px] mx-auto border rounded-xl p-5 my-5">
                <h1 className="text-xl font-bold text-gray-600 mb-2">Create Category</h1>
                <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }} className="flex flex-col gap-5">
                    <form.Field name="category">
                        {(field) => (
                            <label>
                                <p className="text-gray-700 text-sm mb-1">category name</p>
                                <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                            </label>
                        )}
                    </form.Field>

                    <Button type="submit" className="bg-violet-700 hover:bg-violet-500 w-full">
                        {createCategoryMutataion.isPending ? <ButtonLoader /> : 'create'}
                    </Button>
                </form>
            </div>
        </div>
    );
};