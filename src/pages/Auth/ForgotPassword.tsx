import AuthLayout from "@/layouts/AuthLayout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  requestPassword,
  resetPassword,
  verifyOtp,
} from "@/lib/actions/user.actions";

const LOCAL_STORAGE_KEY = "forgot-password-flow";

type PersistedState = {
  step: number;
  email: string;
};

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // track current step: 1=email, 2=otp, 3=new password
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // 1️⃣ Email form schema
  const emailSchema = z.object({
    email: z.string().email(),
  });

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  // Load saved state from localStorage when component mounts
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed: PersistedState = JSON.parse(saved);
        setStep(parsed.step);
        setEmail(parsed.email);
      } catch (e) {
        console.error("Failed to parse saved forgot-password state", e);
      }
    }
  }, []);

  useEffect(() => {
    const toSave: PersistedState = { step, email };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toSave));
  }, [step, email]);

  const handleEmailSubmit = async (data: z.infer<typeof emailSchema>) => {
    setIsLoading(true);
    try {
      const res = await requestPassword(data.email);
      toast({
        title: "Success",
        description: res?.message || "Reset code sent to your email!",
        variant: "success",
      });
      setEmail(data.email); // Save email for next steps
      setStep(2); // Proceed to OTP step
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to send reset code.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 2️⃣ OTP form schema
  const otpSchema = z.object({
    otp: z.string().min(6, "OTP must be 6 characters"),
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const handleOtpSubmit = async (data: z.infer<typeof otpSchema>) => {
    setIsLoading(true);
    try {
      console.log("Submitting OTP:", data, "with email:", email);
      const res = await verifyOtp({
        email, // <-- use your dynamic state here
        otp: data.otp,
      });
      toast({
        title: "Success",
        description: res?.message || "OTP verified successfully!",
        variant: "success",
      });
      setStep(3); // Proceed to new password step
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Invalid OTP.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 3️⃣ Password reset schema
  const passwordSchema = z
    .object({
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const handlePasswordSubmit = async (data: z.infer<typeof passwordSchema>) => {
    setIsLoading(true);
    try {
      console.log("Submitting new password:", data, "with email:", email);
      const res = await resetPassword({
        email, // <-- use your dynamic state here too
        password: data.password,
      });

      toast({
        title: "Success",
        description: res?.message || "Password reset successfully!",
        variant: "success",
      });

      // Clear persisted state on success
      localStorage.removeItem(LOCAL_STORAGE_KEY);

      navigate("/sign-in");
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to reset password.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <section className="auth-form bg-white w-[80%] p-4 md:p-16 md:w-[32rem] rounded-md">
        <header>
          <h1 className="text-[28px] font-bold text-black-1 text-center mb-8">
            {step === 1 && "Reset Password"}
            {step === 2 && "Enter OTP"}
            {step === 3 && "Set New Password"}
          </h1>
        </header>

        {step === 1 && (
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
              className="space-y-8"
            >
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <div>
                    <FormLabel className="form-label">
                      Enter your email
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="you@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="form-message mt-2" />
                  </div>
                )}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="form-btn bg-red w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    &nbsp;Sending...
                  </>
                ) : (
                  "Send OTP"
                )}
              </Button>
            </form>
          </Form>
        )}

        {step === 2 && (
          <Form {...otpForm}>
            <form
              onSubmit={otpForm.handleSubmit(handleOtpSubmit)}
              className="space-y-4"
            >
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <div>
                    <FormLabel className="form-label">
                      Enter OTP sent to {email}
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="otp"
                        placeholder="6-digit code"
                        maxLength={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="form-message mt-2" />
                  </div>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="form-btn bg-red w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    &nbsp;Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </Button>

              <Button
                type="button"
                disabled={isLoading}
                onClick={async () => {
                  setIsLoading(true);
                  try {
                    const res = await requestPassword(email);
                    toast({
                      title: "OTP Resent",
                      description:
                        res?.message ||
                        "A new OTP has been sent to your email.",
                      variant: "success",
                    });
                  } catch (error: any) {
                    toast({
                      title: "Error",
                      description:
                        error?.response?.data?.message ||
                        "Failed to resend OTP.",
                      variant: "destructive",
                    });
                  } finally {
                    setIsLoading(false);
                  }
                }}
                className="bg-transparent text-black w-fit underline p-0 hover:bg-transparent"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    &nbsp;Resending...
                  </>
                ) : (
                  "Resend OTP"
                )}
              </Button>
            </form>
          </Form>
        )}

        {step === 3 && (
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
              className="space-y-8"
            >
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <div className="relative">
                    <FormLabel className="form-label">New Password</FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="New password"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    <FormMessage className="form-message mt-2" />
                  </div>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <div className="relative">
                    <FormLabel className="form-label">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                    <FormMessage className="form-message mt-2" />
                  </div>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="form-btn bg-red w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    &nbsp;Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </Form>
        )}
      </section>
    </AuthLayout>
  );
};

export default ForgotPassword;
