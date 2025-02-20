import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateCurrentUser, updateProfile } from 'firebase/auth';
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

    const updateUserProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        })
    }
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signOutUser = () => {
        return signOut(auth)
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
        user,
        createUserWithEmail,
        updateUserProfile,
        signInUser,
        signOutUser
    }
    return (
        <authContext.Provider value={authVelue}>
            {children}
        </authContext.Provider>
    );
};

export default Authprovider;