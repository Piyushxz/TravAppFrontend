import axios from "axios"

export const signUpHandler = async(username,number,email,password) =>{
    try{
        const data = await axios.post("https://travelapp-backend-cdeh.onrender.com/api/auth/register",{
            username:username, number: number,email:email,password:password
        })
        console.log(data)
    }
    catch(err){
        console.log(err
            
        )
    }
}