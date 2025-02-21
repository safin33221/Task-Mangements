import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

const UpdateTask = ({ updateItem, refetch }) => {
    const handleSubmit = e => {
        e.preventDefault()

        const form = e.target
        if (form.title.value.length > 50) {
            return console.log("length must be less then 50 chart");
        }
        if (form.description.value.length > 200) {
            return console.log("length must be less then 200 chart");
        }
        const updateInfo = {
            ...updateItem,
            title: form.title.value,
            description: form.description.value
        }
        axios.patch(`http://localhost:5050/task/Update/${updateItem._id}`, updateInfo)
            .then(res => {
                refetch()
                document.getElementById('updateTask').close()
            })
    }

    return (
        < dialog id="updateTask" className="modal modal-bottom sm:modal-middle" >
            <div className="modal-box">
                <h3 className="font-bold text-lg">Update!</h3>
                <div>
                    <form onSubmit={handleSubmit}>
                        <label className="input input-bordered flex items-center gap-2 mb-4">

                            <input name='title' defaultValue={updateItem.title} required type="text" className="w-full focus::outline-none" placeholder="Title" />
                        </label>
                        <label className="textarea textarea-bordered focus:outline-none focus:border-none flex items-center gap-2 mb-4">

                            <textarea name='description' rows={5} cols={100} defaultValue={updateItem.description} required type="text" className=" focus:outline-none focus-within:border-none" placeholder="Description" />
                        </label>
                        <button className="btn w-full font-bold">Add</button>
                    </form>
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn ">Close</button>
                    </form>
                </div>
            </div>

        </dialog >
    );
};

export default UpdateTask;