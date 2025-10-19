// fetcher 
import { fetcher } from "../fetcher";

// types and interfaces 
import { ProductImageProp } from "@/src/types/product-image";

// uploading images of product 
export async function UploadImagesProduct(imagesArray: File[]) {
    const formData = new FormData();
    imagesArray.forEach((image) => formData.append('image', image));

    return fetcher('/product/image', {
        method: 'POST',
        body: formData,
    });
};