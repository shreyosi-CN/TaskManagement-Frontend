import React, { useState } from 'react';
import { Button } from 'primereact/button';
import './Task.css';
import { useNavigate} from 'react-router-dom'; // Import useHistory hook

const AddTask = () => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');
    const [error, setError] = useState(null);

    let navigator = useNavigate();

    const token = window.localStorage.getItem("LoginToken");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/api/tasks`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    task_name: taskName,
                    description: description,
                    due_date: dueDate,
                    priority: priority
                })
            });

          

            const data = await response.json();
            console.log(data);
            // Reset form fields
            setTaskName('');
            setDescription('');
            setDueDate('');
            setPriority('');
            navigator('/task/a');
        } catch (error) {
            console.error("Error submitting tasks:", error);
            setError('Failed to add task. Please try again.');
        }
    };

    return (
        <div className="container">
            <div className='header'>
                <div className='text'>Add New Task</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='inputs'>
                    <div className='input'>
                        <label htmlFor="taskName">Task Name:</label>
                        <input className="inputs" type="text" id="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                    </div>
                    <div className='input'>
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className='input'>
                        <label htmlFor="dueDate">Due Date:</label>
                        <input className="inputs" type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                    </div>
                    <div className='input'>
                        <label htmlFor="priority">Priority:</label>
                        <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <Button label="Add Task" type="submit" className="p-button-success" />
                </div>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default AddTask;
