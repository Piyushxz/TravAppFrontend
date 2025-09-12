import { AuthLogin } from "../Auth/AuthLogin";
import { AuthSignUp } from "../Auth/AuthSignUp";
import { useAuth } from "../../context/auth-context";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";

export const AuthModal = () => {
  const { authDispatch, selectedTab } = useAuth();
  const [ref, bounds] = useMeasure();

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
    <MotionConfig transition={{ duration: 0.5, type: "spring", bounce: 0 }}>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 h-screen">
        <motion.div 
          animate={{ height: bounds.height }}
          className="bg-white rounded-2xl shadow-2xl w-[90%] md:w-1/3 max-h-[100vh] overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100 mb-2">
            <button
              className={`flex-1 py-2 rounded-md text-center tracking-tight font-manrope font-semibold transition-colors ${selectedTab === "login" ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 text-center rounded-md tracking-tight font-manrope font-semibold transition-colors ${selectedTab === "signup" ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={handleSignUpClick}
            >
              Signup
            </button>
            <button
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 transition-colors ml-2"
              onClick={handleModalClose}
            >
              <span className="material-icons-outlined text-gray-600">close</span>
            </button>
          </div>
          
          <div ref={ref} className="overflow-auto max-h-[95vh]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selectedTab}
                className="mb-4"
              >
                {selectedTab === "login" ? <AuthLogin /> : selectedTab === "signup" ? <AuthSignUp /> : ""}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
};

export default AuthModal;
