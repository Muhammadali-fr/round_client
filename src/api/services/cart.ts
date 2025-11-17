import { fetcher, getToken } from "../fetcher";

export async function addToCart(data: { productId: string }) {
    const token = getToken();
    return fetcher('/cart', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};