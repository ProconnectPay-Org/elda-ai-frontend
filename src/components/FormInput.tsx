import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Control, FieldPath } from "react-hook-form";
import { onboardSchema } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type FormSchema = z.infer<typeof onboardSchema>;

interface CustomInputProps<T extends FormSchema> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  className?: string;
  type: "input" | "select";
  options?: { value: string; label: string }[];
}

const FormInput = <T extends FormSchema>({
  control,
  name,
  label,
  placeholder,
  className,
  type = "input",
  options,
}: CustomInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className={className}>
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            {type === "input" ? (
              <FormControl>
                <Input
                  id={name}
                  placeholder={placeholder}
                  className=""
                  type="text"
                  {...field}
                />
              </FormControl>
            ) : (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options?.map((option) => (
                    <SelectItem value={option.value} key={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default FormInput;
