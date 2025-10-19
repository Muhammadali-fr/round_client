// types and interfaces importing 
import { ProductImageProp } from "./product-image";

// category type 
interface ProductCategoryProp {
    id: string;
    name: string;
};

// single product, product/121231232
export interface SingleProductProp {
    id: string;
    image: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
    UserId: string;
    categoryId: string;
    images: ProductImageProp[]
    category: ProductCategoryProp;
};

// product in array prop
export interface ProductProp {
    id: string;
    image: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
    UserId: string;
    categoryId: string;
};