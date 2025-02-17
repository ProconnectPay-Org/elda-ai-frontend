import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Control, FieldPath, FieldValues, ControllerRenderProps } from "react-hook-form";
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
  renderInput?: (inputProps: ControllerRenderProps<T>) => React.ReactElement;
  children?: (field: ControllerRenderProps<T>) => React.ReactNode;
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
      render={({ field }) => {
        // Explicitly handle different input types
        const inputProps = {
          ...field,
          value: type === 'file' ? undefined : field.value,
          // For file inputs, remove the value prop entirely
          ...(type === 'file' && { value: undefined }),
        };

        return (
          <div className={className}>
            <FormLabel className="form-label">{label}</FormLabel>
            <div className="flex w-full flex-col">
              {type === "file" ? (
                <FormControl>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PDF or Word (MAX. 5MB)</p>
                        {field.value && (
                          <p className="mt-2 text-sm text-gray-700">
                            Selected file: {field.value}
                          </p>
                        )}
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
                  {children ? (
                    children(field)
                  ) : renderInput ? (
                    renderInput(field)
                  ) : (
                    <Input
                      {...inputProps}
                      type={type === "number" ? "number" : "text"}
                      placeholder={placeholder}
                    />
                  )}
                </FormControl>
              )}
              <FormMessage />
            </div>
          </div>
        );
      }}
    />
  );
};

export default FormInput;
