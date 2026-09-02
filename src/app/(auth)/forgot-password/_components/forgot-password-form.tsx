"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormField } from "@/app/(dashboard)/_dashboard/reusable/CustomInput";

interface ForgotPasswordValues {
  email: string;
}

const ForgotPasswordForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>();

  const emailField = register("email", {
    required: "Email is required",
    pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" },
  });

  const onSubmit = handleSubmit(async ({ email }) => {
    router.push(`/verify-otp?email=${encodeURIComponent(email.trim())}`);
  });

  return (
    <form onSubmit={onSubmit} className="mx-auto flex min-h-screen w-full max-w-lg items-center justify-center p-6">
      <div className="flex w-full max-w-md flex-col gap-5 rounded-sm border bg-gray-200 p-6 shadow-md">
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-semibold text-[#151513]">Forgot password?</h1>
          <p className="mt-2 text-sm text-gray-500">Enter your email and we&apos;ll send you a verification code.</p>
        </div>
        <FormField
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email}
          {...emailField}
          onChange={(event) => {
            setValue("email", event.target.value, { shouldValidate: true });
            void emailField.onChange(event);
          }}
        />
        <Button type="submit" size="lg" disabled={isSubmitting} className="h-[52px] w-full">
          {isSubmitting ? "Sending..." : "Send verification code"}
        </Button>
        <Link href="/login" className="text-center text-sm font-medium text-[#182144] hover:underline">
          Back to sign in
        </Link>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
