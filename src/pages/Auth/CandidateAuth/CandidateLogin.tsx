import PcpLogo from "@/assets/pcplogo.svg";
import EldaLogo from "@/assets/elda-ai-logo-no-bg.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { adminSignIn } from "@/lib/actions/user.actions";

const CandidateLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formSchema = z.object({
    password: z.string().min(8),
    email: z.string().email(),
  });

  // 1. Define your form.
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
        localStorage.setItem("candidate_access_token", response.access);
        console.log(response);
        navigate("/candidate-status");
      } else {
        console.log("Sign-in failed: Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full form-bg">
      <div className="flex items-center justify-center flex-col pt-8">
        <div className="flex items-center justify-center gap-4 max-w-full h-[200px]">
          <img src={PcpLogo} alt="pcp-logo" />
          <img src={EldaLogo} alt="elda-logo" className="w-[30%] md:w-[15%]" />
        </div>
      </div>
      <section className="border border-red bg-white w-[80%] p-4 md:p-12 min-h-[400px] flex flex-col justify-evenly md:w-[32rem] rounded-2xl mx-auto">
        <h2 className="text-center font-semibold text-2xl">Sign In</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 h-[80%]"
          >
            <CustomInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email"
            />

            <div className="space-y-2">
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />
              <div className="flex gap-1 items-center">
                <Checkbox className="w-4 h-4 rounded-none flex p-1 items-center justify-center" />
                <small>Remember me</small>
              </div>
            </div>

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
    </section>
  );
};

export default CandidateLogin;
