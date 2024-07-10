import "./Auth.css"
import { useAuth } from "../../context/auth-context"
import { validateNumber } from "../../utils/number-regex"
import { validateName } from "../../utils/name-regex"
import { validatePassword } from "../../utils/password-regex"
import { validateEmail } from "../../utils/email-regex"
import { signUpHandler } from "../../services/signup-service"

let isNameValid,isEmailValid,isNumberValid,isPassValid,isConfirmPassValid;

export const AuthSignUp = () =>{
    const {name,number,email,password,authDispatch,confirmPassword} = useAuth()


    console.log({name,number,email,password,confirmPassword});
    const handleNumberChange = (e) =>{
         isNumberValid = validateNumber(e.target.value)
        if (isNumberValid){
            authDispatch({
                type:"NUMBER",
                payload:e.target.value
            })
        }
        else{
            console.log("Invalid Number")
        }

    }
    const handleNameChange = (e) =>{
         isNameValid = validateName(e.target.value)
        if(isNameValid){
            authDispatch({
                type:"NAME",
                payload:e.target.value
            })
        }else{
            console.log("Invalid Name")
        }

    }
    const handleEmailChange = (e) =>{
         isEmailValid = validateEmail(e.target.value)
        if(isEmailValid){
            authDispatch({
                type:"EMAIL",
                payload:e.target.value
            })
        }else{
            console.log("Invalid Email")
        }

    }
    const handlePasswordChange = (e) =>{
         isPassValid = validatePassword(e.target.value)
        if(isPassValid){
            authDispatch({
                type:"PASSWORD",
                payload:e.target.value
            })
        }
        else{
            console.log("Invalid Password")
        }

    }
    const handleConfirmPasswordChange = (e) =>{
         isConfirmPassValid = validatePassword(e.target.value)
        if(isConfirmPassValid){
            authDispatch({
                type:"CONFIRM_PASSWORD",
                payload:e.target.value
            })
        }
        else{
            console.log("Invalid confirm password")
        }

    }
    console.log({name,number,email,password,confirmPassword});

    const handleFormSubmit = (e) =>{
        e.preventDefault();
        console.log(isNameValid,isNumberValid,isEmailValid,isPassValid,isConfirmPassValid);
        if(isNameValid && isEmailValid && isNumberValid && isPassValid && isConfirmPassValid ){
            signUpHandler(name,number,email,password)
        }
        authDispatch({
          type:"CLEAR_USER_DATA"
        })
    }
    return(
        <div className="auth-container">
        <form onSubmit={handleFormSubmit}>
          <div className="d-flex direction-column lb-in-container">
            <label className="auth-label">
              Mobile Number <span className="asterisk">*</span>{" "}
            </label>
            <input
            defaultValue={number}
              type="number"
              className="auth-input"
              maxLength="10"
              placeholder="Enter Mobile Number"
              required
              onChange={handleNumberChange}
            />
          </div>
          <div className="d-flex direction-column lb-in-container">
            <label className="auth-label">
              Name <span className="asterisk">*</span>{" "}
            </label>
            <input
            defaultValue={name}
              className="auth-input"
              placeholder="Enter Name"
              required
              onChange={handleNameChange}
            />
          </div>
          <div className="d-flex direction-column lb-in-container">
            <label className="auth-label">
              Email <span className="asterisk">*</span>{" "}
            </label>
            <input
            defaultValue={email}
              className="auth-input"
              placeholder="Enter Email"
              type="email"
              required
              onChange={handleEmailChange}
            />
          </div>
          <div className="d-flex direction-column lb-in-container">
            <label className="auth-label">
              Password <span className="asterisk">*</span>{" "}
            </label>
            <input
                defaultValue={password}
              className="auth-input"
              placeholder="Enter Password"
              type="password"
              required
              onChange={handlePasswordChange}
            />
          </div>
          <div className="d-flex direction-column lb-in-container">
            <label className="auth-label">
              Confirm Password <span className="asterisk">*</span>{" "}
            </label>
            <input
             defaultValue={confirmPassword}
              className="auth-input"
              placeholder="Enter Password"
              type="password"
              required
              onChange={handleConfirmPasswordChange}
           
            />
          </div>
          <div>
            <button className="button btn-primary btn-login cursor">
              Submit
            </button>
          </div>
        </form>
      </div>
    )
}