
// types
type Product = {
    id: string;
    image: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    images?: string[];
};

export default function Card(product: Product) {
    return (
        <div key={product.id}>Card</div>
    )
}