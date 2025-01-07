import { useContext } from "react";
import Footer from "../../../shared/components/footer/Footer";
import Navbar from "../../../shared/components/navbar/Navbar";
import RegisterForm from "../components/registerForm/RegistrationForm";
import { UserContext } from "../../../context/userProvider";
import ErrorPage from "../../../shared/components/ui/errorPage";

const SignUpLayout = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      {user ? (
        <>
          <Navbar></Navbar>
          <div className="mt-10">
            {" "}
            {/* Add margin-top */}
            <RegisterForm />
          </div>
          <Footer></Footer>
        </>
      ) : (
        <ErrorPage />
      )}
    </div>
  );
};

export default SignUpLayout;
