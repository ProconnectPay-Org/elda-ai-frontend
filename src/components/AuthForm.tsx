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
import GoogleIcon from "@/assets/google-logo.svg";
import { toast } from "./ui/use-toast";

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const formSchema = authFormSchema();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const response = await adminSignIn({
        email: data.email,
        password: data.password,
      });

      if (response) {
        localStorage.setItem("access_token", response.access);
        toast({
          title: "Success",
          description: "Sign-in successful. Redirecting...",
          variant: "success",
        });
        navigate("/admin-dashboard");
      } else {
        toast({
          title: "Error",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
      console.log(error);
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

      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <Button
        variant={"outline"}
        className="w-full bg-white text-[#333333] border-[#333333] gap-2"
      >
        <img src={GoogleIcon} alt="google icon" />
        Continue with Google
      </Button>
    </section>
  );
};

export default AuthForm;
