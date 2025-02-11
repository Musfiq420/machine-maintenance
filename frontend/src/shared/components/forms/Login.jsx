import { useContext, useState } from "react";
import { UserContext } from "../../../context/userProvider";
import FormInputFields from "../ui/formInputFields";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login, user } = useContext(UserContext);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <FormInputFields
            input={email}
            setInput={(id, value) => setEmail(value)}
            name={"Email"}
            id="email"
            type="string"
            errorField={[]}
          />
          <FormInputFields
            input={password}
            setInput={(id, value) => setPassword(value)}
            name={"Password"}
            id="password"
            type="string"
            errorField={[]}
          />
          {errorMessage && (
            <p className="text-sm text-red-600 mb-4">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary-dark text-white font-semibold rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
