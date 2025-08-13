import { fetcher } from "../fetcher";

export async function create_product(data: { name: string, image: string, description: string, price: number, images: any }) {
    return fetcher("/product", {
        method: "POST",
        data
    })
}

export async function get_products() {
    return fetcher("/product", {
        method: "GET",
    })
}

export async function get_product(id: string) {
    return fetcher(`/product/${id}`, {
        method: "GET",
    })
}

export async function update_product(id: string, data: { name: string, image: string, description: string, price: number, images: any }) {
    return fetcher(`/product/${id}`, {
        method: "PATCH",
        data
    })
}

export async function delete_product(id: string) {
    return fetcher(`/product/${id}`, {
        method: "DELETE",
    })  
}


