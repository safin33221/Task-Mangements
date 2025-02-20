import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import AddModal from '../../Components/AddModal';

const initialTasks = [
    { id: '1', content: 'Buy groceries' },
    { id: '2', content: 'Finish React project' },
    { id: '3', content: 'Call the bank for account inquiry' },
    { id: '4', content: 'Schedule a dentist appointment' },
    { id: '5', content: 'Read 20 pages of a book' },
    { id: '6', content: 'Clean the workspace' },
    { id: '7', content: 'Reply to important emails' },
    { id: '8', content: 'Workout for 30 minutes' },
    { id: '9', content: 'Plan weekend trip' },
    { id: '10', content: 'Update resume' },
];

const columnsFromBackend = {
    todo: {
        name: 'To Do',
        items: initialTasks,
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

const MyTask = () => {
    const [columns, setColumns] = useState(columnsFromBackend);

    const onDragEnd = (result) => {
        console.log(result); // Debugging log
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
        <div >
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
                                        className={`p-2 min-h-[150px] rounded ${snapshot.isDraggingOver ? 'bg-blue-200' : 'bg-white'
                                            }`}
                                    >
                                        {column.items.map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`border flex gap-2 border-gray-400 p-2 mb-2 bg-white shadow-sm cursor-move ${snapshot.isDragging ? 'opacity-50' : 'opacity-100'
                                                            }`}
                                                    >
                                                        <h1> {index + 1}.</h1>
                                                        <h1> {item.content}</h1>
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
            <AddModal />

        </div>
    );
};

export default MyTask;
