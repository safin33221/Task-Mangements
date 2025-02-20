

const MyTask = () => {
    return (
        <div>
            <div className="grid grid-cols-3 gap-5 ">
                <div className="border-2 text-center h-44">
                    <h1>ToDo</h1>
                </div>
                <div className="border-2 text-center h-44">
                    <h1>InProgress</h1>
                </div>
                <div className="border-2 text-center h-44">
                    <h1>completed</h1>

                </div>
            </div>
        </div>
    );
};

export default MyTask;