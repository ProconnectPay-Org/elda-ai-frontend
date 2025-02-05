import PcpLogo from "@/assets/proconnect-logo-new-no-bg.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const CandidateOTP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formSchema = z.object({
    password: z.string().min(6),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      console.log(data);

      navigate("/onboard");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full form-bg">
      <div className="flex items-center justify-center flex-col pt-8">
        <div className="flex items-center justify-center max-w-[500px] h-[200px]">
          <img src={PcpLogo} alt="pcp-logo" className="w-[50%] md:scale-150" />
        </div>
      </div>
      <section className="border border-red bg-white w-[80%] p-4 md:px-12 md:py-6 min-h-[200px] flex flex-col justify-evenly md:w-[32rem] rounded-2xl mx-auto">
        <h2 className="text-center font-semibold text-2xl">Sign In</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 h-[80%]"
          >
            <FormField
              control={form.control}
              name={"password"}
              render={({ field }) => (
                <div className="">
                  <FormLabel className="form-label">OTP</FormLabel>
                  <div className="flex w-full flex-col relative">
                    <FormControl>
                      <Input
                        id={"password"}
                        placeholder="Input OTP"
                        className="input-class"
                        type="text"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="form-message mt-2" />
                  </div>
                </div>
              )}
            />

            <div className="flex flex-col gap-4">
              <div>
                <p className="font-bold">Consent Declaration</p>
                <p className="text-xs">
                  By submitting your information, you consent to Proconnect
                  sharing your personal data with our trusted third-party
                  partners solely for the purpose of facilitating your
                  educational and financing needs. We are committed to
                  protecting your privacy and will never sell or misuse your
                  data. Your information will only be used in accordance with
                  our privacy policy, and you may withdraw your consent at any
                  time
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="text-sm">
                  YES, I DO UNDERSTAND AND GIVE MY CONSENT
                </label>
              </div>
            </div>

            <div className="flex w-full">
              <Button
                type="submit"
                disabled={isLoading}
                className="form-btn bg-red w-full"
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

export default CandidateOTP;
