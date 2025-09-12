import "./Auth.css"
import { validateNumber } from "../../utils/number-regex"
import { validatePassword } from "../../utils/password-regex"
import { useAuth } from "../../context/auth-context";
import { loginHandler } from "../../services/login-service";
import { Eye, EyeOff, Smartphone, Lock } from "lucide-react";
import { useState } from "react";

let isPassValid,isNumberValid;


export const AuthLogin = () =>{
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true)
        try {
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
        } catch (error) {
            console.error("Login failed:", error)
        } finally {
            setIsLoading(false)
            authDispatch({
                type:"CLEAR_USER_DATA",
            })
            authDispatch({
                type:"SHOW_AUTH_MODAL"
            })
        }
    }

    const handleTestCredentialsClick = async()=>{
        setIsLoading(true)
        try {
            const {accessToken,username} = await loginHandler(9112310888,"Piyush@12");
            authDispatch({
                type:"SET_ACCESS_TOKEN",
                payload:accessToken
               })
               authDispatch({
                type:"SET_USER_NAME",
                payload:username
               })
        } catch (error) {
            console.error("Test login failed:", error)
        } finally {
            setIsLoading(false)
            authDispatch({
                type:"CLEAR_USER_DATA",
            })
            authDispatch({
                type:"SHOW_AUTH_MODAL"
            })
        }
    }
    return(
        <div className="w-full max-w-md mx-auto overflow-y-auto shadow-sm">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 shadow-sm">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-manrope font-bold tracking-tight text-gray-900 mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-sm font-manrope tracking-tight text-gray-600">
                        Sign in to your account to continue
                    </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                    {/* Mobile Number Input */}
                    <div className="space-y-1">
                        <label htmlFor="mobile-number" className="text-sm font-manrope font-medium tracking-tight text-gray-700">
                            Mobile Number
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Smartphone className="h-5 w-5 text-gray-400" />
                            </div>
                            <input 
                                id="mobile-number"
                                type="tel" 
                                maxLength="10" 
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors font-manrope tracking-tight text-gray-900 placeholder-gray-400"
                                placeholder="Enter your mobile number" 
                                required
                                onChange={handleNumberChange}
                                defaultValue={number}
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1">
                        <label htmlFor="password" className="text-sm font-manrope font-medium tracking-tight text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input 
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors font-manrope tracking-tight text-gray-900 placeholder-gray-400"
                                placeholder="Enter your password" 
                                required
                                onChange={handlePasswordChange}
                                defaultValue={password}
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

                    {/* Login Button */}
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-manrope font-medium tracking-tight py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Signing in...</span>
                            </div>
                        ) : (
                            "Sign In"
                        )}
                    </button>

                    {/* Test Credentials Button */}
                    <button 
                        onClick={handleTestCredentialsClick}
                        type="button" 
                        disabled={isLoading}
                        className="w-full border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 font-manrope font-medium tracking-tight py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
                    >
                        Use Test Credentials
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-xs font-manrope tracking-tight text-gray-500">
                        By signing in, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    )
}
    