"use client"

// form 
import { useForm } from "react-hook-form";

// types and interfaces 
import { UserEditProp } from "@/src/types/edit-user";
import { useSelector } from "react-redux";
import { RootState } from "@/src/lib/store";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function UserSettings() {

    const user = useSelector((state: RootState) => state.user.data);

    const form = useForm<UserEditProp>({
        defaultValues: {
            image: null,
            name: '',
            role: user?.role
        }
    });

    return (
        <div className="custom-width border rounded-xl p-5 my-5">
            <h1 className="text-xl font-bold text-gray-600 mb-2">Edit User</h1>
            <Form {...form}>
                <FormField control={form.control} name="image" render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            rasm tabnla
                            <Input type="file" />
                        </FormLabel>
                    </FormItem>
                )}>
                </FormField>
            </Form>
        </div>
    );
};