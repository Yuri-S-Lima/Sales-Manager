import React, { createContext, useState } from "react";

export const AuthContext = createContext({})

function AuthProvider({children}){

    const [user, setUser] = useState({});
    const [userName, setName] = useState({});

    return (
        <AuthContext.Provider value = {{user, setUser, userName, setName}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;