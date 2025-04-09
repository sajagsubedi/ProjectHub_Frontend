"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/signUpSchema";
import { LuLoaderCircle } from "react-icons/lu";
import { z } from "zod";
import { SIGN_UP } from "@/graphql";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Page() {

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      username: "",
      password: "",
    },
  });

  const [signup,  {loading, error }] = useMutation(SIGN_UP);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    const response = await signup({
      variables: {
        fullName: data.fullName,
        email: data.email,
        username: data.username,
        password: data.password,
      },
    });
    if (response.data.signup.success) {
      toast.success(response.data.signup.message);
      router.push("/signin");
    } else {
      toast.error(response.data.signup.message);
    }
  };

  return (
    <section className="text-gray-600 body-font px-6 pt-20 flex justify-center">
      <div className="w-full sm:w-[325px] flex flex-col">
        <h2 className=" text-2xl md:text-3xl mb-4 font-bold title-font text-left ">
          Get <span className="text-rose-600">Started</span> with us
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative mb-4">
            <label
              htmlFor="fullName"
              className="leading-7 text-sm text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              {...register("fullName")}
              required
              placeholder="John Doe"
              className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="username"
              className="leading-7 text-sm text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username")}
              required
              placeholder="johndoe"
              className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              required
              placeholder="johndoe@example.com"
              className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="••••••••"
              required
              className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-rose-600 border-0 py-2 px-6 mt-5 gap-2 focus:outline-none w-full hover:bg-rose-700 rounded text- flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <LuLoaderCircle className="animate-spin text-lg" />
            )}
            Signup
          </button>
        </form>
        <div className="mt-5 flex items-center gap-2 justify-center text-gray-500">
          <hr className="w-[175px] h-[2px] bg-gray-200" />
          or
          <hr className="w-[175px]  h-[2px] bg-gray-200" />
        </div>
        <p
          className="flex gap-2 justify-end 
                    mt-6"
        >
          Already have a account?
          <Link className="text-rose-500 underline" href="/signin">
            Signin
          </Link>
        </p>
      </div>
    </section>
  );
}
