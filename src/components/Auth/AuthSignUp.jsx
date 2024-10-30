import { useAuth } from "../../context/auth-context";
import { validateNumber } from "../../utils/number-regex";
import { validateName } from "../../utils/name-regex";
import { validatePassword } from "../../utils/password-regex";
import { validateEmail } from "../../utils/email-regex";
import { signUpHandler } from "../../services/signup-service";

let isNameValid, isEmailValid, isNumberValid, isPassValid, isConfirmPassValid;

export const AuthSignUp = () => {
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isNameValid && isEmailValid && isNumberValid && isPassValid && isConfirmPassValid) {
      signUpHandler(name, number, email, password);
      authDispatch({ type: "CLEAR_USER_DATA" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <form
        onSubmit={handleFormSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg max-h-[90vh] overflow-auto"
      >
        <h2 className="text-lg font-semibold text-textPrimary mb-4">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-textPrimary mb-2">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            defaultValue={number}
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
            maxLength="10"
            placeholder="Enter Mobile Number"
            required
            onChange={handleNumberChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-textPrimary mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            defaultValue={name}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
            placeholder="Enter Name"
            required
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-textPrimary mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            defaultValue={email}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
            placeholder="Enter Email"
            type="email"
            required
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-textPrimary mb-2">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            defaultValue={password}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
            placeholder="Enter Password"
            type="password"
            required
            onChange={handlePasswordChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-textPrimary mb-2">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            defaultValue={confirmPassword}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
            placeholder="Confirm Password"
            type="password"
            required
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <div>
          <button className="w-full px-4 py-2 text-white bg-primary rounded hover:bg-opacity-80 transition">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
