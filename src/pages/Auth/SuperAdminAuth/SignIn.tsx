import AuthForm from "@/components/AuthForm";
import AuthLayout from "@/layouts/AuthLayout";

const SignIn = () => {
  return (
    <AuthLayout>
      <AuthForm type="sign-in" />
    </AuthLayout>
  );
};

export default SignIn;
