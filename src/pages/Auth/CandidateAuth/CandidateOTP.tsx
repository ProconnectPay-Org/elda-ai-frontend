import PcpLogo from "@/assets/proconnect-logo-new-no-bg.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { postOTP } from "@/lib/actions/candidate.actions";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";

const CandidateOTP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const onSubmit = async () => {
    if (!email || !value) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Missing email or OTP.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await postOTP({ email, otp: value });
      console.log(response);
      toast({
        title: "Success",
        description: response?.message,
        variant: "success",
      });
      navigate(`/onboard/?email=${email}`);
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      const errorMessage =
        err.response?.data?.message || "Something went wrong";

      toast({
        title: "Error",
        variant: "destructive",
        description: errorMessage,
      });
      console.error(error);
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
        <h2 className="text-center font-semibold text-2xl">OTP</h2>

        <div>
          <label htmlFor="otp" className="text-sm font-medium">
            Enter OTP sent to your mail
          </label>
          <InputOTP
            maxLength={7}
            value={value}
            onChange={(val) => setValue(val)}
            className="w-full mx-auto flex items-center justify-center"
          >
            <InputOTPGroup className="w-full items-center justify-between gap-5">
              {[...Array(6)].map((_, index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <div className="text-center text-sm my-5">
            Didn't receive a code?{" "}
            <span className="text-red underline cursor-pointer">Resend</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <p className="font-bold">Consent Declaration</p>
            <p className="text-xs">
              By submitting your information, you consent to Proconnect sharing
              your personal data with our trusted third-party partners solely
              for the purpose of facilitating your educational and financing
              needs. We are committed to protecting your privacy and will never
              sell or misuse your data.
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-sm">
              YES, I UNDERSTAND AND GIVE MY CONSENT
            </label>
          </div>
        </div>

        <div className="flex w-full">
          <Button
            type="button"
            onClick={onSubmit}
            disabled={isLoading}
            className="form-btn bg-red w-full"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
      </section>
    </section>
  );
};

export default CandidateOTP;
