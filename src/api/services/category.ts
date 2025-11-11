// fetcher 
import { fetcher } from "../fetcher";

// types 
import { CategoryProp } from "@/src/types/category";

// get all categories 
export async function GetCategory(): Promise<CategoryProp[]> {
    return fetcher('/category', {
        method: 'GET'
    });
};

// create category 
export async function createCategory(data: { name: string }) {
    return fetcher('/category', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
};