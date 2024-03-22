import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import './Task.css';
import { useNavigate, useParams } from 'react-router-dom';

const EditTask = () => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');

    const [error, setError] = useState(null);

    const { id } = useParams();
    const navigator = useNavigate();
    const token = window.localStorage.getItem("LoginToken");

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/getTask/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await response.json();
                console.log(data);
                setTaskName(data.data.task_name);
                setDescription(data.data.description);
                setDueDate(data.data.due_date);
                setPriority(data.data.priority);
                setStatus(data.data.status);

            } catch (error) {
                console.error("Error fetching task:", error);
                setError('Failed to fetch task details.');
            }
        };

        fetchTask();
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/api/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    task_name: taskName,
                    description: description,
                    due_date: dueDate,
                    priority: priority,
                    status:status
                })
            });

            // Reset form fields
            navigator('/task/a');
        } catch (error) {
            console.error("Error updating task:", error);
            setError('Failed to update task. Please try again.');
        }
    };

 

    return (
        <div className="container">
            <div className='header'>
                <div className='text'>Edit Task</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='inputs'>
                    <div className='input'>
                        <label htmlFor="taskName">Task Name:</label>
                        <input className="inputs" type="text" id="taskName" name="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                    </div>
                    <div className='input'>
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className='input'>
                        <label htmlFor="dueDate">Due Date:</label>
                        <input className="inputs" type="date" id="dueDate" name="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                    </div>
                    <div className='input'>
                        <label htmlFor="priority">Priority:</label>
                        <select id="priority" name="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>

                    <div className='input'>
                        <label htmlFor="status">Status:</label>
                        <select id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <Button label="Update Task" type="submit" className="p-button-success" />
                </div>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default EditTask;
