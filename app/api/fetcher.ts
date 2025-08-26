// axios 
import axios, { AxiosRequestConfig } from "axios"

export async function fetcher<T>(
    url: string,
    options: AxiosRequestConfig = {}
): Promise<T> {
    const isFormData = options.data instanceof FormData;

    const res = await axios<T>(`http://localhost:8000${url}`, {
        ...options,
        headers: {
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...options.headers,
        },
        withCredentials: true,
    });

    return res.data;
}
