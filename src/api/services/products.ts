
// fetcher function 
import { fetcher } from "../fetcher";

// get user 
export function getUser() {
    return fetcher('/auth/profile', {
        method: 'GET',
        credentials: 'include',
    });
}