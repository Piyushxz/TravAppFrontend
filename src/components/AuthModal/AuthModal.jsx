import { AuthLogin } from "../Auth/AuthLogin";
import { AuthSignUp } from "../Auth/AuthSignUp";
import { useAuth } from "../../context/auth-context";

export const AuthModal = () => {
  const { authDispatch, selectedTab } = useAuth();

  const handleLoginClick = () => {
    authDispatch({
      type: "SET_TO_LOGIN",
    });
  };

  const handleSignUpClick = () => {
    authDispatch({
      type: "SET_TO_SIGNUP",
    });
  };

  const handleModalClose = () => {
    authDispatch({
      type: "SHOW_AUTH_MODAL",
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-overlay">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 max-h-[90vh] overflow-auto"> 
        <div className="flex items-center justify-between p-4 border-b">
          <button
            className={`flex-1 py-2 text-center font-semibold ${selectedTab === "login" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"} transition`}
            onClick={handleLoginClick}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 text-center font-semibold ${selectedTab === "signup" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"} transition`}
            onClick={handleSignUpClick}
          >
            Signup
          </button>
          <button
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200"
            onClick={handleModalClose}
          >
            <span className="material-icons-outlined">close</span>
          </button>
        </div>
        <div className="p-4">
          {selectedTab === "login" ? <AuthLogin /> : selectedTab === "signup" ? <AuthSignUp /> : ""}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
