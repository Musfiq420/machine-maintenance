import Footer from "../../../../shared/components/footer/Footer";
import Navbar from "../../../../shared/components/navbar/Navbar";
import Login from "../../components/loginForm/Login";

const LoginLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="mt-8"> {/* Add margin-top */}
                <Login />
            </div>
            <Footer></Footer>
        </div>
    );
};

export default LoginLayout;