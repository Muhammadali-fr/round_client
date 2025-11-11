
export async function fetcher(url: string, options: RequestInit = {}) {
    const res = await fetch(`http://localhost:8000${url}`, {
        ...options,
        credentials: 'include',
        headers: {
            ...options.headers,
        }
    })

    return res.json();
}

// get token function 
export const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('accessToken');
    }
    return null;
}