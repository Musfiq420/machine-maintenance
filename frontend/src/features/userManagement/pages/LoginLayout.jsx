import { useContext, useEffect } from "react";
import Footer from "../../../shared/components/footer/Footer";
import Navbar from "../../../shared/components/navbar/Navbar";
import { UserContext } from "../../../context/userProvider";
import { useNavigate } from "react-router-dom";
import Loader from "../../../shared/components/ui/loader";
import Login from "../../../shared/components/forms/Login";

const LoginLayout = () => {
  const { user, userLoading } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard/machine-monitoring");
    }
  }, [user]);
  return (
    <div>
      {!userLoading ? (
        <>
          <div className="mt-8">
            {" "}
            {/* Add margin-top */}
            <Login />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default LoginLayout;
