// fetcher function  
import { fetcher } from "../fetcher";

// auth/login 
export function loginUser(data: { email: string }) {
    return fetcher('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

// auth/register 
export function registerUser(data: { email: string, name: string }) {
    return fetcher('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    });
};

// auth/verify?token = ... 
export function verifyUser(token: string) {
    return fetcher(`/auth/verify?token=${token}`);
}

// get user 
export function getUser() {
    return fetcher('/auth/profile', {
        method: 'GET',
        credentials: 'include',
    });
}