import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Dashboard = () => {
    const [chartData, setChartData] = useState([]);

    const token = window.localStorage.getItem('LoginToken');

    useEffect(() => {
        const fetchTaskData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/chartData', {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch task data');
                }
                const data = await response.json();
                setChartData([
                    { name: 'Total', value: data.total },
                    { name: 'Pending', value: data.pending },
                    { name: 'Complete', value: data.completed }
                ]);
            } catch (error) {
                console.error('Error fetching task data:', error);
                // Handle error
            }
        };

        fetchTaskData();
    }, [token]);

    return (
        <div className="dashboard">
            <h1 className='pageHead'>Dashboard</h1>
            <div className='chart'>

            <div className='chartContainer'>
            <PieChart width={500} height={500}>
                <Pie
                    dataKey="value"
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={200}
                    fill="#8884d8"
                    label
                >
                    {
                        chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip />
            </PieChart>
            </div>
            </div>
           
        </div>
    );
};

export default Dashboard;
