import Footer from "../../../../shared/components/footer/Footer";
import Navbar from "../../../../shared/components/navbar/Navbar";
import EmployeeList from "../../components/registerForm/EmployeeList";


const EmployeeListLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="mt-8"> {/* Add margin-top */}
            <EmployeeList></EmployeeList>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default EmployeeListLayout;