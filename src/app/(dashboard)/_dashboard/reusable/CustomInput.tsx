"use client";

import React from "react";
import { FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";

interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  variant?: "auth" | "cms";
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      className,
      containerClassName,
      variant = "auth",
      id,
      name,
      labelClassName,
      ...props
    },
    ref
  ) => {
    const inputId = id || name;

    const inputStyle =
      variant === "cms"
        ? "h-12 rounded-lg px-2.5 py-2 text-sm focus:border-blue-600 focus:ring-blue-600/15"
        : "h-[52px] rounded-xl px-3 py-2.5 focus:border-[#182144] focus:ring-[#182144]/15";

    return (
      <div className={cn("w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "mb-1.5 block text-base font-semibold leading-6 text-[#4A4C56]",
              labelClassName
            )}
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <input
          {...props}
          ref={ref}
          id={inputId}
          name={name}
          className={cn(
            "w-full border border-[#D9DDE7] bg-white text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
            inputStyle,
            error &&
              "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            error || helperText ? `${inputId}-message` : undefined
          }
        />

        {(error || helperText) && (
          <p
            id={`${inputId}-message`}
            role={error ? "alert" : undefined}
            className={cn(
              "mt-1.5 text-xs",
              error ? "text-red-500" : "text-gray-500"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

interface FormFieldProps extends Omit<CustomInputProps, "error"> {
  label: string;
  error?: FieldError;
  labelClassName?: string;
  wrapperClassName?: string;
}

export function FormField({
  error,
  wrapperClassName,
  ...props
}: FormFieldProps) {
  return (
    <CustomInput
      {...props}
      error={error?.message}
      containerClassName={wrapperClassName}
    />
  );
}

export default CustomInput;