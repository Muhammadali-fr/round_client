// fetcher function  
import { fetcher } from "../fetcher";

// auth/login 
export async function loginUser(data: { email: string }) {
    return fetcher('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

// auth/register 
export async function registerUser(data: { email: string, name: string }) {
    return fetcher('auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    });
};