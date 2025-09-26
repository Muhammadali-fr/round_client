
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