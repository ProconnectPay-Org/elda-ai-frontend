import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Control, FieldPath, FieldValues, FieldInputProps } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  className?: string;
  type: "input" | "select" | "number" | "file";
  options?: { value: string; label: string }[];
  validation?: z.ZodType;
  renderInput?: (inputProps: any) => React.ReactElement;
  children?: (field: FieldInputProps<T>) => React.ReactNode;
}

const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className,
  type = "input",
  options,
  validation,
  renderInput,
  children,
}: CustomInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      rules={validation ? { validate: (value) => {
        try {
          validation.parse(value);
          return true;
        } catch (error) {
          return error instanceof z.ZodError ? error.errors[0].message : "Invalid input";
        }
      } } : undefined}
      render={({ field }) => (
        <div className={className}>
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            {type === "input" ? (
              <FormControl>
                {renderInput ? (
                  renderInput(field)
                ) : (
                  <Input
                    id={name}
                    placeholder={placeholder}
                    className=""
                    type="text"
                    {...field}
                    value={field.value?.toString() ?? ''}
                  />
                )}
              </FormControl>
            ) : type === "file" ? (
              <FormControl>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full border-2 border-gray-300 rounded-md cursor-pointer bg-white hover:bg-gray-50 py-2 px-4">
                    <input 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.doc,.docx" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Validate file type and size
                          const maxSize = 5 * 1024 * 1024; // 5MB
                          const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                          
                          if (!allowedTypes.includes(file.type)) {
                            alert('Please upload a PDF or Word document.');
                            e.target.value = ''; // Clear the input
                            return;
                          }
                          
                          if (file.size > maxSize) {
                            alert('File size should not exceed 5MB.');
                            e.target.value = ''; // Clear the input
                            return;
                          }
                          
                          // If validation passes, update form value
                          field.onChange(file.name);
                          
                          // Optional: Add file preview or upload logic
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            // You can add logic here to handle file preview or upload
                            console.log('File loaded:', event.target?.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <span className="text-sm text-gray-500">
                        {field.value ? `${field.value}` : 'Upload CV'}
                      </span>
                    </div>
                  </label>
                </div>
              </FormControl>
            ) : type === "select" ? (
              <FormControl>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value?.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            ) : (
              <FormControl>
                {renderInput ? (
                  renderInput(field)
                ) : (
                  <Input
                    id={name}
                    placeholder={placeholder}
                    className=""
                    type="number"
                    {...field}
                    value={field.value?.toString() ?? ''}
                  />
                )}
              </FormControl>
            )}
            {children && children(field)}
            <FormMessage />
          </div>
        </div>
      )}
    />
  );
};

export default FormInput;
