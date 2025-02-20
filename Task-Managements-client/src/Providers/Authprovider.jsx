import { onAuthStateChanged } from 'firebase/auth';
import React, { Children, createContext, useEffect } from 'react';

const authContext = createContext(null)

// useEffect(() => {
//     const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
//         console.log(currentUser);
//     })
//     return () => {
//         unsubcribe()
//     }
// }, [])
const Authprovider = ({ children }) => {
    return (
        <authContext.Provider>
            {children}
        </authContext.Provider>
    );
};

export default Authprovider;