import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

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
        <div className="navbar bg-base-100 px-16 mx-auto shadow-xl fixed top-0 w-full">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Todo</a>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Item 1</a></li>
                        <li>
                            <details>
                                <summary>Parent</summary>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <div className="dropdown dropdown-end">

                    {
                        user ? <div>
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={user?.photoURl} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><button onClick={handleSingOut}>Logout</button></li>
                            </ul>
                        </div> : <div>
                            <Link to='/signUp'><button className="btn btn-xl rounded-full my-4">Get Start</button></Link>
                        </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;