import { fetcher } from "../fetcher";
// get token function 
const get_token = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('accessToken');
    }
    return null;
}

export async function update_user(data: { name: string, role: 'CUSTOMER' | "SELLER", file: File | any }) {
    const token = get_token();

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('role', data.role)
    if (data.file) {
        formData.append('file', data.file)
    }

    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }


    return fetcher("/user/update", {
        method: "POST",
        data: formData,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

}