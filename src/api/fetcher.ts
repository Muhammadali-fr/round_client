export async function fetcher(url: string, options: RequestInit = {}) {
    const res = await fetch(`http://localhost:8000${url}`, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        }
    });

    if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        throw new Error(errorBody?.message || `HTTP Error ${res.status}`);
    }

    return res.json();
};

// get token function 
export const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('accessToken');
    }
    return null;
}