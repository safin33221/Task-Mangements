import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { LuLoaderPinwheel } from "react-icons/lu";
import axios from 'axios';
const SingIn = () => {
    const { signInUser, GoogleLogin } = useAuth()
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const onsubmit = (data) => {
        setLoading(true)
        signInUser(data.email, data.password)
            .then(res => {
                navigate('/myTask')
            })
    }
    const handleGoogleSignIn = () => {
        GoogleLogin()
            .then((res) => {
                const userInfo = {
                    name: res.user.displayName,
                    email: res.user.email,
                    image: res.user.photoURL
                }
                axios.post('http://localhost:5050/user', userInfo)
                    .then(res => {
                        console.log(res.data);
                    })
                // navigate('/myTask')
            })
    }
    return (
        <div className="pt-16 pb-7 px-4 mx-auto">
            {/* <Helmet title="HRS | SIGN UP" /> */}
            <form onSubmit={handleSubmit(onsubmit)} >
                <div className="max-w-xl mx-auto border shadow-2xl rounded-lg p-4">
                    <h1 className="text-3xl font-bold text-center py-5">SignIN Now!</h1>
        


                    <label className="input input-bordered flex items-center gap-2 mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input {...register("email")} required type="email" className=" focus::outline-none" placeholder="Email" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 mb-4 relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd" />
                        </svg>
                        <input {...register("password")} type={showPass ? 'text' : 'password'} className=" focus:outline-none" placeholder="password " />
                        <button type='button' className='absolute right-3 top-4' onClick={() => setShowPass(!showPass)}>{showPass ? <FaEye /> : <FaEyeSlash />}</button>
                    </label>

                    <label className="flex items-center gap-2 mb-4 mx-auto">

                        <button className="btn btn-outlin=font-bold mx-auto w-full">{
                            loading ? <LuLoaderPinwheel className="animate-spin text-xl" /> : "Sign Up"
                        }</button>
                    </label>
                    <p>Already have an Account? <Link to='/signUp' className="text-blue-800">Sign In Now</Link></p>
                    <button
                        onClick={handleGoogleSignIn}
                        className='btn my-4 mx-auto w-full'
                    >
                        <FaGoogle />

                        <p>Continue with Google</p>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SingIn;