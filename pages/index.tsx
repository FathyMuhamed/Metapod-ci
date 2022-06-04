import { Product } from "@prisma/client";
import type { GetServerSideProps, NextPage, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import prisma from "../db";
import ProductCard from "./../components/ProductCard";

export async function getServerSideProps() {
  const products = await prisma.product.findMany();
  return {
    props: { products },
  };
}

interface HomeProps {
  products: Product[];
}

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { products } = props;
  return (
    <div>
      <Head>
        <title>Ecommerce</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <ul className='grid grid-cols-1 gap-10 sm:grid-cols-3'>
        {products.map((p, i: number) => (
          <ProductCard product={p} key={i} />
        ))}
      </ul>
    </div>
  );
}
