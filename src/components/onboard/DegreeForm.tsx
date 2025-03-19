import { useFormContext } from "react-hook-form";
import FormInput from "@/components/FormInput";
import {
  advancedDegreeTypeOptions,
  classOfDegreeMastersOptions,
  classOfDegreeOptions,
  degreeTypeOptions,
  graduateOptions,
  yesNoOptions,
} from "@/constants";
import { Button } from "../ui/button";
import SaveBtn from "../SaveBtn";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import Cookies from "js-cookie";
import axios from "axios";

const DegreeForm = () => {
  const { control, watch, getValues } = useFormContext();
  const [isFirstDegreeLoading, setIsFirstDegreeLoading] = useState(false);
  const [isSecondDegreeLoading, setIsSecondDegreeLoading] = useState(false);
  const { toast } = useToast();

  const saveDegree = async (
    e: React.MouseEvent<HTMLButtonElement>,
    degreeType: "first" | "second"
  ) => {
    e.preventDefault();
    const email = getValues("emailAddress");
    if (!email) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Email is required to save degree details!",
      });
      return;
    }

    // Determine degree ID and form values dynamically
    const degreeId = Cookies.get(`${degreeType}_degree_id`);
    const url = degreeId
      ? `https://elda-ai-drf.onrender.com/api/onboarding-candidate/s/${email}/degrees/${degreeId}`
      : `https://elda-ai-drf.onrender.com/api/onboarding-candidate/s/${email}/degrees/${
          degreeType === "first" ? 1 : 2
        }`;

    const degreeData =
      degreeType === "first"
        ? {
            institution: getValues("institutionName"),
            course: getValues("courseOfStudy"),
            degree: getValues("kindOfDegree"),
            cgpa_class: getValues("degreeClass"),
            cgpa: getValues("specificCGPA"),
          }
        : {
            degree: getValues("mastersDegree"),
            course: getValues("mastersCourse"),
            cgpa_class: getValues("classOfDegreeMasters"),
            cgpa: getValues("specificCGPAMasters"),
            institution: getValues("mastersInstitution"),
          };

    degreeType === "first"
      ? setIsFirstDegreeLoading(true)
      : setIsSecondDegreeLoading(true);

    try {
      const response = await axios.post(url, degreeData);
      toast({
        variant: "success",
        description: `${
          degreeType === "first" ? "First" : "Second"
        } Degree details saved successfully!`,
      });

      // Update the stored ID if it was just created
      if (!degreeId) {
        Cookies.set(`${degreeType}_degree_id`, String(response.data.id));
      }
    } catch (error) {
      console.error(`Error saving ${degreeType} Degree:`, error);
      toast({
        variant: "destructive",
        description: `Failed to save ${
          degreeType === "first" ? "First" : "Second"
        } Degree details.`,
      });
    } finally {
      degreeType === "first"
        ? setIsFirstDegreeLoading(false)
        : setIsSecondDegreeLoading(false);
    }
  };

  return (
    <>
      {/* FIRST DEGREE */}
      <div className="flex flex-col gap-y-3 border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
        <h4 className="text-[25px] font-bold mb-6">First Degree</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <FormInput
            control={control}
            name="graduateOf"
            label="Graduate Of"
            type="select"
            options={graduateOptions}
            placeholder="--Select--"
            asterisks="*"
          />
          <FormInput
            control={control}
            name="institutionName"
            label="Name of University or Polytechnic Graduated from"
            type="input"
            placeholder=""
            asterisks="*"
          />
          <FormInput
            control={control}
            name="kindOfDegree"
            label="Kind Of Degree"
            type="select"
            placeholder="-- Select --"
            options={degreeTypeOptions}
            asterisks="*"
          />

          {/* Class of degree */}
          <FormInput
            control={control}
            name="degreeClass"
            label="Class Of Degree"
            type="select"
            placeholder="-- Select --"
            options={classOfDegreeOptions}
            asterisks="*"
          />

          <FormInput
            control={control}
            name="specificCGPA"
            label="Specific CGPA"
            type="input"
            placeholder=""
            asterisks="*"
          />

          <FormInput
            control={control}
            name="courseOfStudy"
            label="Course of Study"
            type="input"
            placeholder="Enter your course of study"
            asterisks="*"
          />
        </div>
        <Button
          disabled={isFirstDegreeLoading}
          className="bg-red mt-5"
          onClick={(e) => saveDegree(e, "first")}
        >
          {isFirstDegreeLoading ? <SaveBtn text="Saving" /> : "Save Degree"}
        </Button>
      </div>

      {/* Second Degree Details */}
      <div className="flex flex-col gap-y-3 border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
        <h4 className="text-[25px] font-bold mb-6">Second Degree</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <FormInput
            control={control}
            name="hasMasters"
            label="Do you have a Master's Degree"
            type="select"
            options={yesNoOptions}
            placeholder="--Select--"
            asterisks="*"
          />
          <FormInput
            control={control}
            name="mastersDegree"
            label="If yes, kind of degree"
            type="select"
            placeholder=""
            options={advancedDegreeTypeOptions}
            required={watch("hasMasters") === "true"}
          />

          <FormInput
            control={control}
            name="mastersCourse"
            label="Course of Study Graduated from with master's if applicable"
            type="input"
            placeholder=""
            required={watch("hasMasters") === "true"}
          />

          <FormInput
            control={control}
            name="classOfDegreeMasters"
            label="Class of degree masters"
            type="select"
            placeholder="-- Select --"
            options={classOfDegreeMastersOptions}
            required={watch("hasMasters") === "true"}
          />

          <FormInput
            control={control}
            name="specificCGPAMasters"
            label="Specific CGPA Masters"
            type="input"
            placeholder=""
            required={watch("hasMasters") === "true"}
          />
          <FormInput
            control={control}
            name="mastersInstitution"
            label="Name Of Institution"
            type="input"
            placeholder=""
            required={watch("hasMasters") === "true"}
          />
        </div>
        <Button
          disabled={isSecondDegreeLoading}
          className="bg-red mt-5"
          onClick={(e) => saveDegree(e, "second")}
        >
          {isSecondDegreeLoading ? <SaveBtn text="Saving" /> : "Save Degree"}
        </Button>
      </div>
    </>
  );
};

export default DegreeForm;
