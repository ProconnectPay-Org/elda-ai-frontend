import { useState } from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Control, FieldPath } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  gender: z.string().optional(),
  fullName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  phoneNumber: z.string().optional(),
  numberOfJobs: z.string().optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
});

type FormSchema = z.infer<typeof schema>;

interface CustomInputProps<T extends FormSchema> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  className?: string;
}

const CustomInput = <T extends FormSchema>({
  control,
  name,
  label,
  placeholder,
  className,
}: CustomInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField =
    name === "password" ||
    name === "newPassword" ||
    name === "currentPassword" ||
    name === "confirmPassword";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className={className}>
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col relative">
            <FormControl>
              <Input
                id={name}
                placeholder={placeholder}
                className={`input-class`}
                type={
                  isPasswordField && showPassword
                    ? "text"
                    : isPasswordField
                    ? "password"
                    : "text"
                }
                {...field}
              />
            </FormControl>
            {isPasswordField && (
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            )}
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
