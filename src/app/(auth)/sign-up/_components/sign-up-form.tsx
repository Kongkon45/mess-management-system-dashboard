"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormField } from "@/app/(dashboard)/_dashboard/reusable/CustomInput";

interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>();

  const onSubmit = handleSubmit(async (values) => {
    console.log("Sign up submitted", values);
  });

  return (
    <form onSubmit={onSubmit} className="mx-auto flex w-full max-w-lg flex-col items-center justify-center p-6">
      <div className="flex w-full max-w-md flex-col gap-5 rounded-sm border bg-gray-200 p-6 shadow-md">
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-semibold text-[#151513]">Create your account</h1>
          <p className="mt-2 text-sm text-gray-500">Join your mess management workspace.</p>
        </div>

      <FormField
        label="Full name"
        type="text"
        placeholder="Your full name"
        autoComplete="name"
        error={errors.name}
        {...register("name", { required: "Full name is required" })}
      />
      <FormField
        label="Email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        error={errors.email}
        {...register("email", {
          required: "Email is required",
          pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" },
        })}
      />
      <FormField
        label="Password"
        type="password"
        placeholder="Create a password"
        autoComplete="new-password"
        error={errors.password}
        {...register("password", {
          required: "Password is required",
          minLength: { value: 8, message: "Password must be at least 8 characters" },
        })}
      />
      <FormField
        label="Confirm password"
        type="password"
        placeholder="Repeat your password"
        autoComplete="new-password"
        error={errors.confirmPassword}
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: (value) => value === watch("password") || "Passwords do not match",
        })}
      />

      <Button type="submit" size="lg" disabled={isSubmitting} className="h-[52px] w-full">
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>
      <p className="text-center text-sm text-gray-500">
        Already have an account? <Link className="font-medium text-[#182144] hover:underline" href="/login">Sign in</Link>
      </p>
      </div>
    </form>
  );
};

export default SignUpForm;