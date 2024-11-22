import Footer from "../../../../shared/components/footer/Footer";
import Navbar from "../../../../shared/components/navbar/Navbar";
import RegisterForm from "../../components/registerForm/RegistrationForm";

const SignUpLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="mt-8"> {/* Add margin-top */}
                <RegisterForm />
            </div>
            <Footer></Footer>
        </div>
    );
};

export default SignUpLayout;