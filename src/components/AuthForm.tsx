import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomInput from "./CustomInput";
import { adminSignIn } from "@/lib/actions/user.actions";
// import GoogleIcon from "@/assets/google-logo.svg";
import { toast } from "./ui/use-toast";
import { CustomAxiosError } from "@/types";
import Cookies from "js-cookie";

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const formSchema = authFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const response = await adminSignIn({
        email: data.email,
        password: data.password,
      });

      if (response) {
        toast({
          title: "Success",
          description: "Sign-in successful. Redirecting...",
          variant: "success",
        });

        const userRole = response.user.role;
        Cookies.set("user_role", userRole);

        if (userRole === "admin" || userRole === "analyst") {
          Cookies.set("access_token", response.access, { expires: 7 }); // 7 days expiration
          navigate("/admin-dashboard");
        } else if (userRole === "staff") {
          Cookies.set("staff_access_token", response.access, { expires: 7 });
          navigate("/assigned-candidates");
        } else if (userRole === "candidate") {
          Cookies.set("candidate_access_token", response.access, {
            expires: 7,
          });
          Cookies.set("candidate_id", response.candidate.id, { expires: 7 });
          Cookies.set("education_id", response.candidate.education[0], {
            expires: 7,
          });
          Cookies.set("career_id", response.candidate.career[0], {
            expires: 7,
          });
          Cookies.set(
            "verification_document_id",
            response.candidate.verification_documents[0],
            { expires: 7 }
          );

          if (Array.isArray(response.candidate.job_experience)) {
            const sortedJobExperiences = response.candidate.job_experience
              .slice()
              .sort((a: number, b: number) => a - b);

            const topThreeJobExperiences = sortedJobExperiences.slice(0, 3);

            topThreeJobExperiences.forEach((job: number, index: number) => {
              Cookies.set(`work_experience_id${index + 1}`, String(job), {
                expires: 7,
              });
            });
          }

          Cookies.set(
            "advanced_education1_id",
            response.advanced_education[0],
            {
              expires: 7,
            }
          );

          Cookies.set("referee1_id", response.candidate.loan_referees[0], {
            expires: 7,
          });
          Cookies.set("referee2_id", response.candidate.loan_referees[1], {
            expires: 7,
          });
          Cookies.set("ProfessionalRecommender", response.recommenders[0]);
          Cookies.set("AcademicRecommender", response.recommenders[1]);
          Cookies.set("otherRecommender", response.recommenders[2]);
          if (response.candidate.has_completed_application) {
            navigate("/candidate/status");
          } else {
            navigate("/register");
          }
        } else {
          navigate("/");
        }
      } else {
        toast({
          title: "Error",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      const axiosError = error as CustomAxiosError;
      if (axiosError.response && axiosError.response.data) {
        toast({
          title: "Error",
          description: axiosError.response.data.detail,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: axiosError.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form bg-white w-[80%] p-4 md:p-16 md:w-[32rem] rounded-md">
      <header>
        <h1 className="text-[28px] font-bold text-black-1 text-center mb-8">
          Sign In
        </h1>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CustomInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
          />

          <CustomInput
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
          />

          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="form-btn bg-red"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> &nbsp;
                  Loading...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default AuthForm;
