import { useContext, useEffect } from "react";
import Footer from "../../../shared/components/footer/Footer";
import Navbar from "../../../shared/components/navbar/Navbar";
import Login from "../components/loginForm/Login";
import { UserContext } from "../../../context/userProvider";
import { useNavigate } from "react-router-dom";
import Loader from "../../../shared/components/ui/loader";

const LoginLayout = () => {
  const { user, userLoading } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return (
    <div>
      {!userLoading ? (
        <>
          <Navbar></Navbar>
          <div className="mt-8">
            {" "}
            {/* Add margin-top */}
            <Login />
          </div>
          <Footer></Footer>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default LoginLayout;
