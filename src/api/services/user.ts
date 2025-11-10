// fetcher function 
import { fetcher, getToken } from "../fetcher";

export function updateUser(data: { image: File, name: string, role: 'SELLER' | 'CUSTOMER' }) {
    const token = getToken();
    return fetcher('/user/update', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    });
};