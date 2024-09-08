import AuthForm from "@/components/AuthForm";
import AuthLayout from "@/layouts/AuthLayout";

const AdminSignIn = () => {
  return (
    <AuthLayout>
      <AuthForm type="sign-in" />
    </AuthLayout>
  );
};

export default AdminSignIn;
