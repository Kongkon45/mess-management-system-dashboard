"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { FormField } from "@/app/(dashboard)/_dashboard/reusable/CustomInput";

interface LoginFormValues {
  email: string;
  password: string;
}

type LoginResponse = {
  role?: "admin" | "user";
  user?: { role?: "admin" | "user" };
};

const LoginForm = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  const onSubmit = handleSubmit(async (values) => {
    setLoginError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const result = (await response.json()) as LoginResponse;
      const role = result.role ?? result.user?.role;

      if (role !== "admin" && role !== "user") {
        throw new Error("The login response did not include a valid role");
      }

      router.replace(role === "admin" ? "/admin" : "/user");
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "Unable to sign in");
    }
  });

  return (
    <form onSubmit={onSubmit} className="mx-auto flex w-full max-w-lg flex-col gap-5 p-6  justify-center items-center my-auto ">
    <div className="mx-auto flex w-full max-w-md flex-col gap-5 p-6 border rounded-sm shadow-md bg-gray-200">
        <div className="mb-4 text-center">
        <h1 className="text-3xl font-semibold text-[#151513]">Welcome back</h1>
        <p className="mt-2 text-sm text-gray-500">Sign in to manage your mess.</p>
      </div>

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
        placeholder="Enter your password"
        autoComplete="current-password"
        error={errors.password}
        {...register("password", { required: "Password is required" })}
      />
      {loginError && <p className="text-sm text-red-600">{loginError}</p>}
      <Link href="/forgot-password" className="-mt-2 self-end text-sm font-medium text-[#182144] hover:underline">
        Forgot password?
      </Link>

      <Button type="submit" size="lg" disabled={isSubmitting} className="h-[52px] w-full">
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
      <p className="text-center text-sm text-gray-500">
        Don&apos;t have an account? <Link className="font-medium text-[#182144] hover:underline" href="/sign-up">Create one</Link>
      </p>
    </div>
    </form>
  );
};

export default LoginForm;
