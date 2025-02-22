import React from 'react';
import hero from '../../assets/todo.svg'
import { Link } from 'react-router-dom';
const Hero = () => {
    return (
        <div className='flex flex-col md:flex-row justify-center items-center px-5 mx-auto m-16 '>
            <div className='w-full md:w-1/2'>
                <h1 className='text-4xl font-bold'>TaskMaster - Your Smart To-Do List

                </h1>
                <p>TaskMaster is a simple yet powerful to-do app designed to help you stay organized and productive. Easily create, manage, and prioritize your tasks with an intuitive interface. Set deadlines, mark completed tasks, and track your progress seamlessly. Whether for work, study, or personal goals, TaskMaster keeps you on top of everything. 🚀✅</p>
                <Link to='/myTask'>
                    <button className="btn btn-xl rounded-full my-4">Get Start</button>
                </Link>
            </div>
            <div className=' w-full  md:w-1/2 '>
                <img src={hero} className='' alt="" />
            </div>
        </div>
    );
};

export default Hero;