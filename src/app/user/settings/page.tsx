"use client"

import { useForm } from "react-hook-form";

export default function UserSettings() {

    const form = useForm({})

    return (
        <div className="custom-width border rounded-xl p-5 my-5">
            <h1 className="text-xl font-bold text-gray-600 mb-2">Edit User</h1>

        </div>
    );
};