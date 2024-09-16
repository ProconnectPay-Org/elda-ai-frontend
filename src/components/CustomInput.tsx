import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Control, FieldPath } from "react-hook-form";

// Define a type for the CustomInput component with constraints
interface CustomInputProps<T extends z.ZodType<any, any, any>> {
  control: Control<z.infer<T>>;
  name: FieldPath<z.infer<T>>;
  label: string;
  placeholder: string;
  className?: string;
}

// Update the CustomInput component to use generic type T
const CustomInput = <T extends z.ZodType<any, any, any>>({
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
