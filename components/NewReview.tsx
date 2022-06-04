import { Review, User } from "@prisma/client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import StarIconButton from "./StarIconButton";

const defaultValues = {
  text: "",
  rating: 0,
};

type Inputs = {
  text: String;
  rating: number;
};
interface NewReviewProps {
  productId: string;
  onAddReview: (review: Review & { user: User }) => void;
}
function NewReview(props: NewReviewProps) {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues,
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const req = await fetch("/api/review", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          userId: "cl1e14c2m0040f8ujayephial",
          productId: props.productId,
        }),
      });
      const res = await req.json();
      props.onAddReview(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className='font-bold text-gray-600 text-xl'>Add a Review: </p>
      <section className='mt-2 mb-6'>
        <label className='text-gray-600 text-sm'>Rating: </label>
        <div className='grid grid-cols-5 gap-1 w-32 my-2'>
        {Array.from(Array(5)).map((value: undefined, i: number) => (
            <StarIconButton
              key={i}
              filled={watch('rating') >= i + 1}
              onClick={() => setValue('rating', i + 1)}
            />
          ))}
        </div>
      </section>
      <section>
        <label className='text-gra-600 text-sm'>Review:</label>
        <textarea
          placeholder='Add a review'
          className='border border-gray-300 rounded-lg p-2 w-full h-32 mt-2'
          {...register("text")}
        />
        {/* <p className='text-red-600 italic'>{errors.text}</p> */}
        <div>
          <button
            type='submit'
            className='bg-purple-700 text-white rounded-full py-2 px-4 text-sm hover:bg-purple-800 shadow-md'>
            Submit
          </button>
        </div>
      </section>
    </form>
  );
}

export default NewReview;
