"use client"

import { upload_image_product } from "@/app/api/services/products";

const page = () => {

    const handleImage = async (e:any) => {
        const file = e.target.files[0];
        const res = await upload_image_product(file);
        console.log(res);
        alert('rasm uploaded')
    }

  return (
    <div>
        <input onChange={e => handleImage(e)} type="file" />

    </div>
  )
}

export default page