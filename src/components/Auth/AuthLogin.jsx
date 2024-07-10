import "./Auth.css"
import { validateNumber } from "../../utils/number-regex"
import { validatePassword } from "../../utils/password-regex"
import { useAuth } from "../../context/auth-context";
import { loginHandler } from "../../services/login-service";

let isPassValid,isNumberValid;


export const AuthLogin = () =>{

    const {authDispatch,password,number} = useAuth()

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
        console.log({number,password})
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
    console.log({number,password})


    const handleFormSubmit = async (e) =>{
        e.preventDefault()
        if(isNumberValid && isPassValid){
           const {accessToken,username} =  await loginHandler(number,password)
           authDispatch({
            type:"SET_ACCESS_TOKEN",
            payload:accessToken
           })
           authDispatch({
            type:"SET_USER_NAME",
            payload:username
           })

        }

        authDispatch({
            type:"CLEAR_USER_DATA",
        })
        authDispatch({
            type:"SHOW_AUTH_MODAL"
        })
    }

    const handleTestCredentialsClick = async()=>{
        const {accessToken,username} = await loginHandler(9112310888,"Piyush@12");
        authDispatch({
            type:"SET_ACCESS_TOKEN",
            payload:accessToken
           })
           authDispatch({
            type:"SET_USER_NAME",
            payload:username
           })
           authDispatch({
            type:"CLEAR_USER_DATA",
        })
        authDispatch({
            type:"SHOW_AUTH_MODAL"
        })
    }
    return(
<div className="auth-container">
    <form onSubmit={handleFormSubmit}>
        <div className="d-flex direction-column lb-in-container">
            <label className="auth-label" htmlFor="mobile-number">Mobile Number</label>
            <input 
                id="mobile-number"
                type="number" 
                maxLength="10" 
                className="auth-input" 
                placeholder="Enter Mobile Number" 
                required
                onChange={handleNumberChange}
                defaultValue={number}
            />
        </div>
        <div className="d-flex direction-column lb-in-container">
            <label className="auth-label" htmlFor="password">Password</label>
            <input 
                id="password"
                className="auth-input" 
                placeholder="Enter Password" 
                type="password" 
                required
                onChange={handlePasswordChange}
                defaultValue={password}
            />
        </div>
        <div>
            <button 
                type="submit" 
                className="button btn-primary btn-login cursor-pointer"
            >
                Login
            </button>
        </div>
        <div className="cta">
            <button 
                onClick={handleTestCredentialsClick}
                type="button" 
                className="button btn-outline-primary btn-login cursor-pointer"
            >
                Login with test credentials
            </button>
        </div>
    </form>
</div>

    )
}
    