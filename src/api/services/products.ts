
// fetcher function 
import { fetcher, getToken } from "../fetcher";

// types and interface
import { ProductImageProp } from "@/src/types/product-image";

// get products 
export function getProducts(query?: string) {
    if (!query) {
        query = '';
    };
    return fetcher(`/product?search=${query}`, {
        method: 'GET',
    });
}

// get one product 
export function getOneProduct(id: string) {
    return fetcher(`/product/${id}`, {
        method: 'GET',
    });
};

// delete product 
export function deleteProduct(id: string) {
    const token = getToken();
    if (!token) {
        alert('token not found');
    };

    return fetcher(`/product/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// create product 
export function CreateProduct(product: { name: string, image: string, description: string, price: number, stock: number, images: ProductImageProp[], category: string }) {
    const token = getToken();
    return fetcher('/product', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    });
};