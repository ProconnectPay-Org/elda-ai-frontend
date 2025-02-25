import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { countryOptions, programTypes, sortedSchools } from "@/constants";
import { Button } from "./ui/button";

const AcsRecommendationForm = ({
  formInstance,
  onSubmit,
  formType,
  isLoading,
}: {
  formInstance: ReturnType<typeof useForm>;
  onSubmit: (data: any) => void;
  formType: "first" | "second";
  isLoading: boolean;
}) => {
  return (
    <Form {...formInstance}>
      <form
        onSubmit={formInstance.handleSubmit(onSubmit)}
        className="w-full md:w-1/2 space-y-4"
      >
        {/* Country */}
        <FormField
          control={formInstance.control}
          name={`country${formType === "first" ? "1" : "2"}`}
          render={({ field }) => (
            <div>
              <FormLabel className="form-label">
                Country Option {`${formType === "first" ? "1" : "2"}`}
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="--Select a country--" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryOptions.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="form-message mt-2" />
            </div>
          )}
        />

        {/* Program Type */}
        <FormField
          control={formInstance.control}
          name={`programType${formType === "first" ? "1" : "2"}`}
          render={({ field }) => (
            <div>
              <FormLabel className="form-label">
                Type of Degree Program {`${formType === "first" ? "1" : "2"}`}
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="--Select a program--" />
                  </SelectTrigger>
                  <SelectContent>
                    {programTypes.map((program) => (
                      <SelectItem key={program} value={program}>
                        {program}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="form-message mt-2" />
            </div>
          )}
        />

        {/* Assigned Course */}
        <FormField
          control={formInstance.control}
          name={`assignedCourse${formType === "first" ? "1" : "2"}`}
          render={({ field }) => (
            <div>
              <FormLabel className="form-label">
                Course Option {`${formType === "first" ? "1" : "2"}`}
              </FormLabel>
              <FormControl>
                <Input
                  id={`assignedCourse${formType}`}
                  placeholder="Fill in a course"
                  {...field}
                />
              </FormControl>
              <FormMessage className="form-message mt-2" />
            </div>
          )}
        />

        {/* Assigned School */}
        <FormField
          control={formInstance.control}
          name={`assignedSchool${formType === "first" ? "1" : "2"}`}
          render={({ field }) => (
            <div>
              <FormLabel className="form-label">
                University Option {`${formType === "first" ? "1" : "2"}`}
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="--Select a school--" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortedSchools.map((school) => (
                      <SelectItem key={school.uniqueId} value={school.name}>
                        {school.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="form-message mt-2" />
            </div>
          )}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            className="form-btn bg-red"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Save"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="form-btn border-red text-red"
          >
            Delete
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AcsRecommendationForm;
