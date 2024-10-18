import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Control, FieldPath } from "react-hook-form";

// Define the form schema and its inferred type
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  // Optional fields
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

// Define a type for the CustomInput component with constraints
interface CustomInputProps<T extends FormSchema> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  className?: string;
}

// Update the CustomInput component to use generic type T
const CustomInput = <T extends FormSchema>({
  control,
  name,
  label,
  placeholder,
  className,
}: CustomInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className={className}>
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                id={name}
                placeholder={placeholder}
                className="input-class"
                type={name === "password" ? "password" : "text"}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
