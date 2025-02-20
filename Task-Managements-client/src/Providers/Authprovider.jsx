import { createUserWithEmailAndPassword, onAuthStateChanged, updateCurrentUser, updateProfile } from 'firebase/auth';
import React, { Children, createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.config';
import { set } from 'react-hook-form';

export const authContext = createContext(null)

const Authprovider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const createUserWithEmail = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile =  (name, image) => {
        return  updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        })
    }
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser)
        })
        return () => {
            unsubcribe()
        }
    }, [])

    const authVelue = {
        createUserWithEmail,
        updateUserProfile
    }
    return (
        <authContext.Provider value={authVelue}>
            {children}
        </authContext.Provider>
    );
};

export default Authprovider;