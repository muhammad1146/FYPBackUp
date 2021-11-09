import React ,{createContext,useState} from 'react';
import { createContext } from "react";
export const UserContext = createContext();
export const UserProvider = (props) => {
    const [user,setUser] = useState({
        uuid:null,type:null,token:null
    });
    return (
        <UserContext.Provider value={[user,setUser]} >
            {props.children}
        </UserContext.Provider>
    )

}
