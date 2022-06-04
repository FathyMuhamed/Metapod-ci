import { Product, Review, User } from "@prisma/client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React,{useState} from "react";
import prisma from "./../../db/index";
import ProductCard from "./../../components/ProductCard";
import Reviews from "../../components/Review";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const product = await prisma.product.findFirst({
    where: {
      id: {
        equals: id as string,
      },
    },
    include: {
      reviews: {
        include: {
          user: true,
        },
      },
    },
  });

  return {
    props: { product, reviews: product ? product.reviews : [] },
  };
};
type ProductWithCount = Product & { _count: { reviews: number } };
interface ProductsProps {
  product: Product & ProductWithCount;
  reviews: (Review & { user: User })[];
}
function product(props: ProductsProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [reviews, setReviews] = useState(props.reviews);

  return (
    <>
      <Head>
        <title>{props.product.name} | Ecommerce</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='grid grid-cols-3 gap-10'>
        <section className='col-span-2'>
          <ProductCard product={props.product} usePurchaseButton />
        </section>
        <section className='w-3/4'>
          <Reviews
            reviews={reviews}
            productId={props.product.id}
            onAddReview={(review: Review & { user: User }) => {
              setReviews([...reviews, review]);
            }}
          />
        </section>
      </div>
    </>
  );
}

export default product;
