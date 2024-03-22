import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate , useParams} from 'react-router-dom'; // Import useHistory hook


const TaskList = () => {
    const { type } = useParams();

    let history = useNavigate();

    const [tasks, setTasks] = useState([]);
    const token = window.localStorage.getItem("LoginToken");
    const [globalFilter, setGlobalFilter] = useState(''); // State for the global filter

    const actionTemplate = (rowData) => {
        return (
            <div>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-text" onClick={() => editTask(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-text" onClick={() => deleteTask(rowData)} />
            </div>
        );
    };




     function editTask(row) {
        history(`/edittask/${row.id}`);

    }

   async function deleteTask(row) {

        try {
            const updatedResponse = await fetch(`http://localhost:8000/api/tasks/${row.id}`, {
                method: "Delete",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
          
        
          
        } catch (error) {
            console.error("Error deleting tasks:", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/tasks/${type}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await response.json();
                // Convert object into an array of tasks
                const tasksArray = Object.values(data.data);

                setTasks(tasksArray); // Set the tasks state with the fetched data
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchData(); // Call fetchData function when component mounts
    }, [type]); // Empty dependency array to run the effect only once when component mounts

    const addTask = () => {
        // Navigate to the Add Task page when the button is clicked
        history('/addtask');
    };
    return (
        <>
                <div className="button-container">

            <Button label="Add Task" onClick={addTask} className="p-button-success addButton" style={{ marginBottom: '1rem' }} />
            </div>

            <h1 className='pageHead'>Task List</h1>
            <DataTable value={tasks} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} globalFilter={globalFilter} emptyMessage="No records found">
                <Column field="id" header="ID" />
                <Column field="task_name" header="Task Name" />
                <Column field="description" header="Description" />
                <Column field="due_date" header="Due Date" />
                <Column field="priority" header="Priority" />
                <Column field="status" header="Status" />
                <Column header="Actions" body={actionTemplate} />
            </DataTable>

        </>
    );
};

export default TaskList;
