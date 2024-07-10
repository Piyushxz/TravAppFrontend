import { AuthLogin } from "../Auth/AuthLogin";
import { AuthSignUp } from "../Auth/AuthSignUp";
import "./AuthModal.css"
import { useAuth } from "../../context/auth-context";

export const AuthModal =  () =>{
    const {authDispatch,selectedTab} = useAuth()
    const handleLoginClick = ()=>{
        authDispatch(
            {
                type:"SET_TO_LOGIN",
            }
        )
    }
    const handleSignUpClick = ()=>{
        authDispatch(
            {
                type:"SET_TO_SIGNUP"
            }
        )
    }

    const handleModalClose = () =>{
        authDispatch({
            type:"SHOW_AUTH_MODAL"
        })
    }

    
    return(
        <div className="auth-modal-container fixed">
            <div className="auth-modal absoulte shadow right">
                <div className="d-flex align-center shadow" >
                    <button   className={`button btn-auth grow-shrink-basis cursor-pointer ${selectedTab === "login" ? "btn-auth-selected" :"" }`} onClick={handleLoginClick}>Login</button>
                    <button className={`button btn-auth grow-shrink-basis cursor-pointer ${selectedTab === "signup" ? "btn-auth-selected" :"" }`} onClick={handleSignUpClick}>Singup</button>
                    <button className="button btn-auth d-flex align-center justify-center cursor-pointer" onClick={handleModalClose}>
                    <span className="material-icons-outlined">close</span>
                    </button>

                </div>
                <div>
                        {selectedTab ==="login" ? <AuthLogin/> : selectedTab ==="signup" ? <AuthSignUp/> : ""}
                    </div>
            </div>
        </div>
    )
}