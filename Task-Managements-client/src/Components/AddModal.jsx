import moment from "moment/moment";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const AddModal = ({ refetch }) => {
    const { user } = useAuth()
    const { register, handleSubmit, reset } = useForm()
    const onsubmit = (data) => {

        if (data.title.length > 50) {
            return Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Tilte length must be less then 50 cheracter",
                showConfirmButton: false,
                timer: 1500
            });
        }
        if (data.description.length > 200) {
            return Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Description length must be less then 50 cheracter",
                showConfirmButton: false,
                timer: 1500
            });
        }
        const taskInfo = {
            ...data,
            date: moment().format('lll'),
            email: user?.email

        }
        axios.post(`https://task-management-server-three-flax.vercel.app/task`, taskInfo)
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

                            <input {...register("title")} required type="text" className=" focus::outline-none" placeholder="Title" />
                        </label>

                        <label className="textarea textarea-bordered focus:outline-none focus:border-none flex items-center gap-2 mb-4">

                            <textarea rows={5} cols={100} {...register("description")} required type="text" className=" focus:outline-none focus-within:border-none" placeholder="Description" />
                        </label>
                        <select {...register('status')} className="select select-bordered select-sm w-full ">
                            <option value='todo'>To Do</option>
                            <option value='inProgress'>In Progress</option>
                            <option value='completed'>Completed</option>
                        </select>
                        <button className="btn my-4 w-full font-bold">Add</button>
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