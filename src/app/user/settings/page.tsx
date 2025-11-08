"use client"

// form 
import { useForm } from "react-hook-form";

// types and interfaces 
import { UserEditProp } from "@/src/types/edit-user";
import { useSelector } from "react-redux";
import { RootState } from "@/src/lib/store";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";


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
            <div className="flex items-start">

                {/* select image */}
                <Form {...form}>
                    <FormField control={form.control} name="image" render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <label className="cursor-pointer" htmlFor="ImageInput">
                                    <Input className="hidden" type="file" id="ImageInput" />
                                    <Image className="w-25 h-25 rounded-full" src={user?.profile} alt={user?.name} width={70} height={70} />
                                </label>
                            </FormLabel>
                        </FormItem>
                    )}>
                    </FormField>
                </Form>


                {/* name */}
                <Form {...form}>
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex flex-col items-start">
                                <p>Your name</p>
                                <Input placeholder={user?.name} />
                            </FormLabel>
                        </FormItem>
                    )}>

                    </FormField>
                </Form>

            </div>
        </div>
    );
};