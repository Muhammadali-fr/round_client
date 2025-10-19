// fetcher 
import { fetcher } from "../fetcher";

// types 
import { CategoryProp } from "@/src/types/category";

// get all categories 
export async function GetCategory(): Promise<CategoryProp[]>{
    return fetcher('/category', {
        method: 'GET'
    });
};