import AuthLayout from "@/layouts/AuthLayout";
import { useState, useEffect } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const LOCAL_STORAGE_KEY = "forgot-password-flow";

type PersistedState = {
  step: number;
  email: string;
};

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // track current step: 1=email, 2=otp, 3=new password
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

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
      console.log("Submitting email:", data);
      // Make API call: await sendResetCode(data.email);
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
      console.log("Submitting OTP:", data);
      // Make API call: await verifyOtp(email, data.otp);
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
      console.log("Submitting new password:", data);
      // Make API call: await resetPassword(email, data.password);

      toast({
        title: "Success",
        description: "Your password has been reset successfully!",
      });

      // Clear persisted state
      localStorage.removeItem(LOCAL_STORAGE_KEY);

      setStep(1); // Restart the flow or redirect user to login
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
              className="space-y-8"
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
                  <div>
                    <FormLabel className="form-label">New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="New password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="form-message mt-2" />
                  </div>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <div>
                    <FormLabel className="form-label">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm password"
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
