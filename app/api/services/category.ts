import { fetcher } from "../fetcher";

// types
import { CategoryType } from "@/app/types/category";

export async function get_categories(): Promise<CategoryType[]> {
    return fetcher<CategoryType[]>('/category', {
        method: 'GET',
    });
};