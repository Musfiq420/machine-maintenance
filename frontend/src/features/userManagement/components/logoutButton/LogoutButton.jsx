import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogOut = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. User might already be logged out.");
      return;
    }

    fetch("http://127.0.0.1:8000/api/user_management/logout/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Logout failed");
        }
      })
      .then((data) => {
        console.log("Logout successful:", data);
        // Clear local storage
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        // Navigate to login page
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <>
    {handleLogOut}
    </>
  );
};

export default LogoutButton;