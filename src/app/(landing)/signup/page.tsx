"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpSchemaType } from "@/schemas/signUpSchema";
import { LuLoaderCircle } from "react-icons/lu";
import { SIGN_UP } from "@/graphql";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue, // Add this
    reset,
    formState: { isSubmitting, errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      avatar: undefined,
      fullName: "",
      email: "",
      username: "",
      password: "",
    },
  });

  const [signup, { loading }] = useMutation(SIGN_UP);

  const onSubmit = async (data: SignUpSchemaType) => {
    console.log(data);
    try {
      const response = await signup({
        variables: {
          avatar: data.avatar,
          fullName: data.fullName,
          email: data.email,
          username: data.username,
          password: data.password,
        },
      });

      if (response.data.signup.success) {
        toast.success(response.data.signup.message);
        reset(); // Reset form values
        router.push("/signin");
      } else {
        toast.error(response.data.signup.message);
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <section className="text-gray-600 body-font px-6 pt-20 flex justify-center">
      <div className="w-full sm:w-[325px] flex flex-col">
        <h2 className="text-2xl md:text-3xl mb-4 font-bold title-font text-left">
          Get <span className="text-rose-600">Started</span> with us
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Avatar Field */}
          <div className="relative mb-4">
            <label htmlFor="avatar" className="leading-7 text-sm text-gray-600">
              Avatar
            </label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setValue("avatar", file); // Manually update the form state
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.avatar && (
              <p className="text-red-500 text-sm">{errors.avatar.message}</p>
            )}
          </div>

          {/* Full Name Field */}
          <InputField
            label="Full Name"
            id="fullName"
            placeholder="John Doe"
            register={register("fullName")}
            error={errors.fullName?.message}
          />

          {/* Username Field */}
          <InputField
            label="Username"
            id="username"
            placeholder="johndoe"
            register={register("username")}
            error={errors.username?.message}
          />

          {/* Email Field */}
          <InputField
            label="Email"
            id="email"
            placeholder="johndoe@example.com"
            register={register("email")}
            error={errors.email?.message}
          />

          {/* Password Field */}
          <InputField
            label="Password"
            id="password"
            type="password"
            placeholder="••••••••"
            register={register("password")}
            error={errors.password?.message}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="text-white bg-rose-600 border-0 py-2 px-6 mt-5 gap-2 focus:outline-none w-full hover:bg-rose-700 rounded flex items-center justify-center"
            disabled={isSubmitting || loading}
          >
            {(isSubmitting || loading) && (
              <LuLoaderCircle className="animate-spin text-lg" />
            )}
            Signup
          </button>
        </form>

        {/* Divider */}
        <div className="mt-5 flex items-center gap-2 justify-center text-gray-500">
          <hr className="w-[175px] h-[2px] bg-gray-200" />
          or
          <hr className="w-[175px] h-[2px] bg-gray-200" />
        </div>

        {/* Signin Link */}
        <p className="flex gap-2 justify-end mt-6">
          Already have an account?
          <Link className="text-rose-500 underline" href="/signin">
            Signin
          </Link>
        </p>
      </div>
    </section>
  );
}

// Reusable InputField Component
function InputField({
  label,
  id,
  type = "text",
  placeholder,
  register,
  error,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  register: any;
  error?: string;
}) {
  return (
    <div className="relative mb-4">
      <label htmlFor={id} className="leading-7 text-sm text-gray-600">
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register}
        placeholder={placeholder}
        className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
