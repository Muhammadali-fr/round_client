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
export function getUser(data: { token: string }) {
    return fetcher('/auth/profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${data.token}`
        }
    });
}

//auth/refresh
export function authRefreshToken(data: { token: string }) {
    return fetcher('/auth/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}