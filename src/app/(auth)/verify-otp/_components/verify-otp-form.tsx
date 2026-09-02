
"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

interface VerifyOtpValues {
  otp: string;
}

const VerifyOtpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const { handleSubmit, setValue, watch } = useForm<VerifyOtpValues>({
    defaultValues: { otp: "" },
  });

  const otp = watch("otp");

  const handleChange = (value: string, index: number) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const code = otp.split("");

    code[index] = digit;
    const newOtp = code.join("").slice(0, 6);

    setValue("otp", newOtp);

    if (digit && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const code = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);

    setValue("otp", code);

    code.split("").forEach((digit, i) => {
      if (inputs.current[i]) inputs.current[i]!.value = digit;
    });

    inputs.current[Math.min(code.length, 5)]?.focus();
  };

  const onSubmit = ({ otp }: VerifyOtpValues) => {
    if (otp.length !== 6) return;

    router.push(
      `/reset-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex min-h-screen w-full max-w-lg items-center justify-center p-6"
    >
      <div className="flex w-full max-w-md flex-col gap-5 rounded-sm border bg-gray-200 p-6 shadow-md">
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-semibold text-[#151513]">
            Verify your email
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter the 6-digit code sent to {email || "your email"}.
          </p>
        </div>

        <div className="flex justify-center gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              ref={(el) => {
                inputs.current[index] = el;
              }}
              value={otp[index] ?? ""}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="h-14 w-12 rounded-xl border bg-white text-center text-xl font-semibold outline-none focus:border-[#182144] focus:ring-2 focus:ring-[#182144]/15"
            />
          ))}
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={otp.length !== 6}
          className="h-[52px] w-full bg-primary cursor-pointer disabled: text-white border border-[#182144]  hover:text-white"
        >
          Verify code
        </Button>

        <Link
          href="/forgot-password"
          className="text-center text-sm font-medium text-[#182144] hover:underline"
        >
          Send a new code
        </Link>
      </div>
    </form>
  );
};

export default VerifyOtpForm;

