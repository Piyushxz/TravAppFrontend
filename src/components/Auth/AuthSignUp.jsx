import { useAuth } from "../../context/auth-context";
import { validateNumber } from "../../utils/number-regex";
import { validateName } from "../../utils/name-regex";
import { validatePassword } from "../../utils/password-regex";
import { validateEmail } from "../../utils/email-regex";
import { signUpHandler } from "../../services/signup-service";
import { Eye, EyeOff, Smartphone, Lock, Mail, User } from "lucide-react";
import { useState } from "react";

let isNameValid, isEmailValid, isNumberValid, isPassValid, isConfirmPassValid;

export const AuthSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { name, number, email, password, authDispatch, confirmPassword } = useAuth();

  const handleNumberChange = (e) => {
    isNumberValid = validateNumber(e.target.value);
    if (isNumberValid) {
      authDispatch({ type: "NUMBER", payload: e.target.value });
    } else {
      console.log("Invalid Number");
    }
  };

  const handleNameChange = (e) => {
    isNameValid = validateName(e.target.value);
    if (isNameValid) {
      authDispatch({ type: "NAME", payload: e.target.value });
    } else {
      console.log("Invalid Name");
    }
  };

  const handleEmailChange = (e) => {
    isEmailValid = validateEmail(e.target.value);
    if (isEmailValid) {
      authDispatch({ type: "EMAIL", payload: e.target.value });
    } else {
      console.log("Invalid Email");
    }
  };

  const handlePasswordChange = (e) => {
    isPassValid = validatePassword(e.target.value);
    if (isPassValid) {
      authDispatch({ type: "PASSWORD", payload: e.target.value });
    } else {
      console.log("Invalid Password");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    isConfirmPassValid = validatePassword(e.target.value);
    if (isConfirmPassValid) {
      authDispatch({ type: "CONFIRM_PASSWORD", payload: e.target.value });
    } else {
      console.log("Invalid confirm password");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isNameValid && isEmailValid && isNumberValid && isPassValid && isConfirmPassValid) {
        await signUpHandler(name, number, email, password);
        authDispatch({ type: "CLEAR_USER_DATA" });
      }
    } catch (error) {
      console.error("Sign up failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-manrope font-bold tracking-tight text-gray-900 mb-2">
            Create Account
          </h2>
          <p className="text-sm font-manrope tracking-tight text-gray-600">
            Join us to start your journey
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5">
          {/* Name Input */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-manrope font-medium tracking-tight text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                defaultValue={name}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg font-manrope tracking-tight text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                placeholder="Enter your full name"
                required
                onChange={handleNameChange}
              />
            </div>
          </div>

          {/* Mobile Number Input */}
          <div className="space-y-2">
            <label htmlFor="mobile-number" className="text-sm font-manrope font-medium tracking-tight text-gray-700">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Smartphone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="mobile-number"
                defaultValue={number}
                type="tel"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg font-manrope tracking-tight text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                maxLength="10"
                placeholder="Enter your mobile number"
                required
                onChange={handleNumberChange}
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-manrope font-medium tracking-tight text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                defaultValue={email}
                type="email"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg font-manrope tracking-tight text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                placeholder="Enter your email address"
                required
                onChange={handleEmailChange}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-manrope font-medium tracking-tight text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                defaultValue={password}
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg font-manrope tracking-tight text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                placeholder="Create a strong password"
                required
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-2">
            <label htmlFor="confirm-password" className="text-sm font-manrope font-medium tracking-tight text-gray-700">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                defaultValue={confirmPassword}
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg font-manrope tracking-tight text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                placeholder="Confirm your password"
                required
                onChange={handleConfirmPasswordChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-manrope font-medium tracking-tight py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating Account...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs font-manrope tracking-tight text-gray-500">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};
