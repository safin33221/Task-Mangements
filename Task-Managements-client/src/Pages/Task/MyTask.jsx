import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import AddModal from '../../Components/AddModal';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteSweep } from "react-icons/md";
import { MdOutlineStart } from "react-icons/md";
import UpdateTask from '../../Components/UpdateTask';

const MyTask = () => {
    const { user } = useAuth();
    const [updateItem, setUpdateItem] = useState({})
    const { data: tasks , refetch } = useQuery({
        queryKey: ['task', user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5050/task/${user?.email}`);
            return res.data;
        }
    });

    console.log(updateItem);
    const handleDelete = id => {
        axios.delete(`http://localhost:5050/delete-task/${id}`)
            .then(res => {
                console.log(res.data);
                refetch()
            })
    }

    const handleUpdate = item => {
        setUpdateItem(item)
        document.getElementById('updateTask').showModal()
        
    }



    const columnsFromBackend = {
        todo: {
            name: 'To Do',
            items: tasks,
        },
        inProgress: {
            name: 'In Progress',
            items: [],
        },
        completed: {
            name: 'Completed',
            items: [],
        },
    };

    const [columns, setColumns] = useState(columnsFromBackend);

    useEffect(() => {
        setColumns({
            todo: {
                name: 'To Do',
                items: tasks,
            },
            inProgress: {
                name: 'In Progress',
                items: [],
            },
            completed: {
                name: 'Completed',
                items: [],
            },
        });
    }, [tasks]);

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


    return (
        <div>
            <div>
                <button onClick={() => document.getElementById('addTask').showModal()} className="btn">Add Task</button>
            </div>
            <div className="grid grid-cols-3 gap-5 p-5">
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
                                                        <div className='flex gap-2 justify-between'>
                                                            <p>{item.date}</p>
                                                            <div className='flex gap-3 text-xl'>
                                                                <button><MdOutlineStart /></button>
                                                                <button onClick={() => handleUpdate(item)}><FaEdit /></button>
                                                                <button onClick={() => handleDelete(item._id)}><MdDeleteSweep /></button>
                                                            </div>
                                                        </div>
                                                        <div className='text-left'>
                                                            <div className='flex gap-2'>
                                                                <h1>{index + 1}.</h1>
                                                                <h1 className='font-bold'>{item.title}</h1>
                                                            </div>
                                                            <div>
                                                                <p>{item.description.slice(0, 50)}</p>
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
            <UpdateTask updateItem={updateItem} refetch={refetch}/>
        </div>
    );
};

export default MyTask;