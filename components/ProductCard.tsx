import React from "react";
import Image from "next/image";
import { Product } from "@prisma/client";
import { formatAsCurrency } from "./../lib/util";
import Link from "next/link";

interface ProductPropsCard {
  product: Product;
  usePurchaseButton?: boolean;
}

function ProductCard({ product, usePurchaseButton }: ProductPropsCard) {
  return (
    <li className='list-none border-gray-300 border rounded-lg py-8 px-6'>
      <div className='text-center'>
        <Image
          src={`${product.image}`}
          alt={product.name}
          width={200}
          height={200}
        />
      </div>
      <h2 className='font-bold text-2xl text-gray-700 mt-4'>{product.name}</h2>
      <p className='text-gray-500 my-4'>{product.description}</p>
      <p className='font-bold text-2xl mb-4'>
        {formatAsCurrency(product.price)}
      </p>
      {usePurchaseButton ? (
        <Link href={`/products/${product.id}`}>
          <a className='bg-purple-700 text-white rounded-full py-2 px-4 text-sm hover:bg-purple-800 shadow-md'>
            Buy Now
          </a>
        </Link>
      ) : (
        <Link href={`/products/${product.id}`}>
          <a className='bg-purple-700 text-white rounded-full py-2 px-4 text-sm hover:bg-purple-800 shadow-md'>
            View Details
          </a>
        </Link>
      )}
    </li>
  );
}

export default ProductCard;
