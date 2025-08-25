import { fetcher } from "../fetcher";

export async function registerUser(data: { email: string, name: string }) {
    return fetcher("/auth/register", {
        method: "POST",
        data
    })
}

export async function loginUser(data: { email: string }) {
    return fetcher("/auth/login", {
        method: "POST",
        data
    })
}

export async function verifyMagicLink(data: { token: string }) {
    return fetcher(`/auth/verify?token=${data.token}`, {
        method: "GET",
    })
}

export async function getProfile(data: { token: string }) {
    return fetcher(`/auth/profile`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${data.token}`
        }
    })
}

export async function refresh_token(token: { token: string }) {
    return fetcher('/auth/refresh', {
        method: "POST",
        data: token
    })
}