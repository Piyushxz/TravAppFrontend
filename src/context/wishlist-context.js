import { useContext,createContext, useReducer } from "react";
import { wishlistReducer } from "../reducer/wishlist-reducer";

const initialValue = {
    wishlist :[]
}

const WishlistContext = createContext(initialValue)


 const WishlistProvier = ({children}) =>{

    const [{wishlist},wishlistDispatch] = useReducer(wishlistReducer,initialValue)
    return(

            
    <WishlistContext.Provider value={{wishlist,wishlistDispatch}}>
    {children}
</WishlistContext.Provider>
    )

    
 
}

const useWishlist = () => useContext(WishlistContext)

export {useWishlist,WishlistProvier}