import AuthForm from "@/components/AuthForm";
import AuthLayout from "@/layouts/AuthLayout";

const SignUp = () => {
  return (
    <AuthLayout>
      <AuthForm type="sign-up" />
    </AuthLayout>
  );
};

export default SignUp;
