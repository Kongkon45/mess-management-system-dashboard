"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormField } from "@/app/(dashboard)/_dashboard/reusable/CustomInput";

interface ResetPasswordValues {
  password: string;
  confirmPassword: string;
}

const ResetPasswordForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>();

  const onSubmit = handleSubmit(async () => {
    router.push("/login");
  });

  return (
    <form onSubmit={onSubmit} className="mx-auto flex min-h-screen w-full max-w-lg items-center justify-center p-6">
      <div className="flex w-full max-w-md flex-col gap-5 rounded-sm border bg-gray-200 p-6 shadow-md">
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-semibold text-[#151513]">Reset password</h1>
          <p className="mt-2 text-sm text-gray-500">Choose a new password for your account.</p>
        </div>
        <FormField
          label="New password"
          type="password"
          placeholder="Enter a new password"
          autoComplete="new-password"
          error={errors.password}
          {...register("password", {
            required: "New password is required",
            minLength: { value: 8, message: "Password must be at least 8 characters" },
          })}
        />
        <FormField
          label="Confirm new password"
          type="password"
          placeholder="Repeat your new password"
          autoComplete="new-password"
          error={errors.confirmPassword}
          {...register("confirmPassword", {
            required: "Please confirm your new password",
            validate: (value) => value === watch("password") || "Passwords do not match",
          })}
        />
        <Button type="submit" size="lg" disabled={isSubmitting} className="h-[52px] w-full">
          {isSubmitting ? "Updating..." : "Update password"}
        </Button>
        <Link href="/login" className="text-center text-sm font-medium text-[#182144] hover:underline">
          Back to sign in
        </Link>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
