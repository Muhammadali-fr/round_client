// fetcher function 
import { fetcher, getToken } from "../fetcher";

export function updateUser(data: { image: File, name: string, role: 'SELLER' | 'CUSTOMER' }) {
    const token = getToken();
    const formData = new FormData();

    if (data.image) formData.append('file', data.image);
    if (data.name) formData.append('name', data.name);
    if (data.role) formData.append('role', data.role);

    return fetcher('/user/update', {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};