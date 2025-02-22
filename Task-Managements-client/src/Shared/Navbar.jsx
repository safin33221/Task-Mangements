import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import logo from '../assets/logo.png'
const Navbar = () => {
    const { user, signOutUser } = useAuth()
    const navigate = useNavigate()
    const handleSingOut = () => {
        signOutUser()
            .then(() => {
                navigate('/')
            })
    }

    return (
        <div className="navbar bg-base-100 md:px-16 mx-auto shadow-xl fixed top-0 w-full">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><NavLink to='/'>Home</NavLink></li>
                        {
                            user && <li><NavLink to='/myTask'>Manage  Task</NavLink></li>
                        }
                    </ul>
                </div>
                <img src={logo} className='w-16' alt="" />
                <h1 className='hidden md:flex'>Task Manager</h1>
            </div>
            <div className="flex-none gap-2 navbar-end">
                <div className="form-control">
                    <ul className="menu menu-horizontal px-4 gap-3 hidden md:flex">
                        <li><NavLink to='/'>Home</NavLink></li>
                        {
                            user && <li><NavLink to='/myTask'>Manage  Task</NavLink></li>
                        }
                    </ul>
                </div>
                <div className="dropdown dropdown-end">

                    {
                        user ? <div className='w-fit'>
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={user?.photoURL} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">

                                <li><button onClick={handleSingOut}>Logout</button></li>
                            </ul>
                        </div> : <div>
                            <Link to='/signIn'><button className="btn btn-xl rounded-full my-4">Get Start</button></Link>
                        </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;