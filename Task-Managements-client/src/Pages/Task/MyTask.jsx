import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import AddModal from '../../Components/AddModal';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteSweep } from "react-icons/md";
import UpdateTask from '../../Components/UpdateTask';
import { LuLoaderPinwheel } from 'react-icons/lu';

const MyTask = () => {
    const { user } = useAuth();
    const [updateItem, setUpdateItem] = useState({});
    const { data: tasks = [], refetch, isPending } = useQuery({
        queryKey: ['task', user?.email],
        queryFn: async () => {
            const res = await axios.get(`https://task-management-server-three-flax.vercel.app/task/${user?.email}`);
            return res.data;
        }
    });
    const categorizeTasks = (tasks) => {
        return {
            todo: {
                name: 'To Do',
                items: tasks.filter(task => task.status === 'todo'),
            },
            inProgress: {
                name: 'In Progress',
                items: tasks.filter(task => task.status === 'inProgress'),
            },
            completed: {
                name: 'Completed',
                items: tasks.filter(task => task.status === 'completed'),
            },
        };
    };
    const [columns, setColumns] = useState(categorizeTasks(tasks));

    useEffect(() => {
        setColumns(categorizeTasks(tasks));
    }, [tasks]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination } = result;

        setColumns((prev) => {
            const sourceColumn = prev[source.droppableId];
            const destColumn = prev[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];

            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);

            axios.put(`https://task-management-server-three-flax.vercel.app/tasks/${removed._id}`, { category: destination.droppableId })
                .then(res => {
                    refetch()
                })

            return {
                ...prev,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            };
        });
    };

    const handleDelete = id => {
        axios.delete(`https://task-management-server-three-flax.vercel.app/delete-task/${id}`)
            .then(res => {
                console.log(res.data);
                refetch();
            });
    };

    const handleUpdate = item => {
        setUpdateItem(item);
        document.getElementById('updateTask').showModal();
    };

    const handleUpdateCategroy = (category, id) => {
        axios.put(`https://task-management-server-three-flax.vercel.app/tasks/${id}`, { category })
            .then(() => {
                refetch();
            });
    };

    if (isPending) return <div className="min-h-screen flex items-center justify-center"><LuLoaderPinwheel className="text-4xl animate-spin" /></div>
    return (
        <div>
            <div className='flex items-center justify-center pt-10'>
                <button onClick={() => document.getElementById('addTask').showModal()} className="btn">Add Task</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
                <DragDropContext onDragEnd={onDragEnd}>
                    {Object.entries(columns).map(([columnId, column]) => (
                        <div key={columnId} className="border-2 text-center p-3 bg-gray-100 shadow-md">
                            <h2 className="text-lg font-bold mb-2">{column.name}</h2>
                            <Droppable droppableId={columnId.toString()} key={columnId.toString()}>
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={`p-2 min-h-[150px] rounded ${snapshot.isDraggingOver ? 'bg-blue-200' : 'bg-white'}`}
                                    >
                                        {Array.isArray(column.items) && column.items.map((item, index) => (
                                            <Draggable key={item._id} draggableId={item._id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`border  border-gray-400 p-2 mb-2 bg-white shadow-sm cursor-move ${snapshot.isDragging ? 'opacity-50' : 'opacity-100'}`}
                                                    >
                                                        <div className='flex flex-col-reverse gap-2 justify-between'>
                                                            <p className='tabs-xs'>{item.date}</p>
                                                            <div className='flex gap-3 text-xl'>
                                                                <select onChange={(e) => handleUpdateCategroy(e.target.value, item._id)} defaultValue={item.status} className="select select-bordered select-sm w-full ">
                                                                    <option value='todo'>To Do</option>
                                                                    <option value='inProgress'>In Progress</option>
                                                                    <option value='completed'>Completed</option>
                                                                </select>
                                                                <button onClick={() => handleUpdate(item)}><FaEdit className='text-green-400' /></button>
                                                                <button onClick={() => handleDelete(item._id)}><MdDeleteSweep className='text-red-500' /></button>
                                                            </div>
                                                        </div>
                                                        <div className='text-left '>
                                                            <div className='flex gap-2'>
                                                                <h1>{index + 1}.</h1>
                                                                <h1 className='font-bold'>{item.title}</h1>
                                                            </div>
                                                            <div>
                                                                <p className='text-xs'>{item.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </DragDropContext>
            </div>
            <AddModal refetch={refetch} />
            <UpdateTask updateItem={updateItem} refetch={refetch} />
        </div>
    );
};

export default MyTask;