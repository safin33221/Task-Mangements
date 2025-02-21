import moment from "moment/moment";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import axios from "axios";

const AddModal = ({refetch}) => {
    const { user } = useAuth()
    const { register, handleSubmit,reset } = useForm()
    const onsubmit = (data) => {
        const taskInfo = {
            ...data,
            date: moment().format('lll'),
            email: user?.email

        }
        axios.post(`http://localhost:5050/task`, taskInfo)
            .then(res => {
                refetch()
                reset()
                document.getElementById('addTask').close()
            })

    }
    return (


        < dialog id="addTask" className="modal modal-bottom sm:modal-middle" >
            <div className="modal-box">
                <h3 className="font-bold text-lg">Add New Task</h3>
                <div>
                    <form onSubmit={handleSubmit(onsubmit)}>
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
                            <input {...register("title")} required type="text" className=" focus::outline-none" placeholder="Title" />
                        </label>
                        <label className="textarea textarea-bordered focus:outline-none focus:border-none flex items-center gap-2 mb-4">

                            <textarea rows={5} cols={100} {...register("description")} required type="text" className=" focus:outline-none focus-within:border-none" placeholder="Description" />
                        </label>
                        <button className="btn">Add</button>
                    </form>
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog >
    );
};

export default AddModal;