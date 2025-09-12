import { fetcher } from "../fetcher";

// types
import { CategoryType } from "@/app/types/category";

export async function get_categories(): Promise<CategoryType[]> {
    return fetcher<CategoryType[]>('/category', {
        method: 'GET',
    });
};

export async function create_category(name: string) {
    return fetcher('/category', {
        method: 'POST',
        data: {name},
    });
};