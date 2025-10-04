// one product 
export interface ProductProp {
    id: string;
    image: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    createdAt: string;
    updatedAt: string;
    userId: string;
    categoryId: string;
};

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