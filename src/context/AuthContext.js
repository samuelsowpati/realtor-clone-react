import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext=createContext()

export const AuthContextProvider=({children})=>{
    const [currentuser, setCurrentUser]=useState({});
    useEffect(()=>{
        const unsub = onAuthStateChanged(getAuth(),(user)=>{
            setCurrentUser(user);
        });
        //cleanup function
        return ()=>{
            unsub();
        };
    },[]);

return(
    <AuthContext.Provider value={{currentuser}}>
        {children}
    </AuthContext.Provider>
);
    
};