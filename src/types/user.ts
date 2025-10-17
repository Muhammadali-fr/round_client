// interfaces 
import { ProductProp } from "./product";

// user 
export interface UserProp {
    id: string;
    name: string;
    email: string;
    profile: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    products: ProductProp[];
};