import { fetcher } from "../fetcher";

// get token function 
const get_token = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('accessToken');
    }
    return null;
}

export async function create_product(data: { name: string, image: any, description: string, price: number, stock: number, images: any }) {
    const token = get_token()
    return fetcher("/product", {
        method: "POST",
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
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
    const token = get_token();
    return fetcher(`/product/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function upload_image_product(images: File[]) {
    const formData = new FormData();

    images.forEach(file => {
        formData.append("images", file);
    });

    return fetch("http://localhost:8000/product/image", {
        method: "POST",
        body: formData,
    }).then(res => res.json());
};