import { CategoryType } from "./category";

type ProductImages = {
    id: string;
    url: string;
}

export interface ProductType {
    id: string;
    image: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    categoryId: string;
    category?: CategoryType;
    images?: ProductImages[];
}
