import { useContext } from "react";
import Footer from "../../../shared/components/footer/Footer";
import Navbar from "../../../shared/components/navbar/Navbar";
import RegisterForm from "../components/registerForm/RegistrationForm";
import { UserContext } from "../../../context/userProvider";
import ErrorPage from "../../../shared/components/ui/errorPage";
import DashboardWrapper from "../../../shared/components/dashboard/dashboardWrapper";

const SignUpLayout = () => {
  const { user } = useContext(UserContext);
  return (
    <DashboardWrapper>
      <RegisterForm />
    </DashboardWrapper>
  );
};

export default SignUpLayout;
