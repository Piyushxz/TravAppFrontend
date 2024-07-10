import { createContext,useContext, useReducer } from "react";
import { authReducer } from "../reducer/auth-reducer";


const initialValue = {
    isAuthModalOpen: false,
    name:"",
    number:"",
    email:"",
    password:"",
    confirmPassword:"",
    accessToken:"",
    username:"",
    selectedTab:"login"
}


const AuthContext = createContext(initialValue)

const AuthProvider = ({children}) =>{

    const [{ accessToken,username, confirmPassword,selectedTab,isAuthModalOpen,name,number,email,password},authDispatch] = useReducer(authReducer,initialValue)
    return(
        <AuthContext.Provider value={{accessToken,username,confirmPassword,selectedTab,isAuthModalOpen,name,number,email,password,authDispatch}}>
        {children}
        </AuthContext.Provider>
    )
}



const useAuth = () => useContext(AuthContext)

export {useAuth,AuthProvider}
 
