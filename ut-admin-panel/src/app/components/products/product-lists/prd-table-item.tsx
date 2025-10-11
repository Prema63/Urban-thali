import Image from "next/image";
import React, { useState } from "react";
import { Delete, Edit } from "@/svg";
import { IProduct } from "@/types/product-type";
import { Rating } from "react-simple-star-rating";
import EditDeleteBtn from "../../button/edit-delete-btn";

const ProductTableItem = ({ product }: { product: IProduct }) => {
  const { _id, img, title, sku, price, reviews, status, quantity } = product || {};

  // const averageRating =
  //   reviews && reviews?.length > 0
  //     ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  //     : 0;

  const averageRating = React.useMemo(() => {
    if (!reviews || reviews.length === 0) return 0;
    return reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  }, [reviews]);


  return (
    <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
      <td className="pr-8 py-5 whitespace-nowrap">
        <a href="#" className="flex items-center space-x-5">
          <Image
            className="w-[60px] h-[60px] rounded-md object-cover bg-[#F2F3F5]"
            src = {product.img}
            alt = { `Image of${title}`}
            width={60}
            height={60}
          />
          <span className="font-medium text-heading text-hover-primary transition">
            {title}
          </span>
        </a>
      </td>
      <td className="px-3 py-3 font-normal text-[#55585B] text-end">#{sku}</td>
      <td className="px-3 py-3 font-normal text-[#55585B] text-end">
        {quantity}
      </td>
      <td className="px-3 py-3 font-normal text-[#55585B] text-end">
        ₹ {price}
      </td>
      <td className="px-3 py-3 font-normal text-heading text-end">
        <div className="flex justify-end items-center space-x-1 text-tiny">
          <span className="text-yellow flex items-center space-x-1">
            <Rating
              allowFraction
              size={18}
              initialValue={averageRating}
              readonly={true}
            />
          </span>
        </div>
      </td>
      <td className="px-3 py-3 text-end">
        <span
          className={`text-[11px] px-3 py-1 rounded-md leading-none font-medium text-end ${status === "available"
              ? "text-success bg-success/10"
              : "text-danger bg-danger/10"
            }`}
        >
          {status}
        </span>
      </td>
      <td className="px-9 py-3 text-end">
        <div className="flex items-center justify-end space-x-2">
          <EditDeleteBtn id={_id} />
        </div>
      </td>
    </tr>
   

  );
};

export default ProductTableItem;














// import Image from "next/image";
// import React, { useMemo } from "react";
// import { Rating } from "react-simple-star-rating";
// import EditDeleteBtn from "../../button/edit-delete-btn";
// import { IProduct } from "@/types/product-type";

// interface Props {
//   product: IProduct;
// }

// const ProductTableItem: React.FC<Props> = ({ product }) => {
//   const { _id, img, title, quantity, price, reviews = [], status } = product || {};

//   // Calculate average rating
//   const averageRating = useMemo(() => {
//     if (reviews.length === 0) return 0;
//     return reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
//   }, [reviews]);

//   return (
//     <tr className="bg-white border-b border-gray6 last:border-0">
//       {/* Product */}
//       <td className="px-3 py-3 flex items-center space-x-3">
//         <Image
//           src={img}
//           width={60}
//           height={60}
//           alt={`Image of ${title}`}
//           className="w-[60px] h-[60px] rounded-md object-cover bg-[#F2F3F5]"
//         />
//         <span className="font-medium text-heading">{title}</span>
//       </td>

//       {/* Quantity */}
//       <td className="px-3 py-3 text-end">{quantity}</td>

//       {/* Price */}
//       <td className="px-3 py-3 text-end">₹ {price}</td>

//       {/* Rating */}
//       <td className="px-3 py-3 text-end">
//         <Rating size={18} initialValue={averageRating} readonly allowFraction />
//       </td>

//       {/* Status */}
//       <td className="px-3 py-3 text-end">
//         <span
//           className={`text-[11px] px-2 py-1 rounded-md font-medium ${
//             status === "available"
//               ? "text-success bg-success/10"
//               : "text-danger bg-danger/10"
//           }`}
//         >
//           {status}
//         </span>
//       </td>

//       {/* Actions */}
//       <td className="px-3 py-3 text-end">
//         <EditDeleteBtn id={_id} />
//       </td>
//     </tr>
//   );
// };

// export default ProductTableItem;
