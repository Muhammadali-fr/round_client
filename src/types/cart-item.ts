import { ProductProp } from "./product";

export interface CartItemProp {
    cartId: string;
    id: string;
    product: ProductProp;
    quantity: number;
}