import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const TaskChart = ({ employeeId }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get(`/api/tasks`, { headers: { 'x-auth-token': localStorage.getItem('token') } });
                const data = res.data;

                if (data && data.length > 0) {
                    const labels = data.map(task => new Date(task.createdAt).toLocaleDateString());
                    const times = data.map(task => task.timeSpent);

                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'Time Spent',
                                data: times,
                                backgroundColor: 'rgba(75,192,192,0.6)',
                                borderColor: 'rgba(75,192,192,1)'
                            }
                        ]
                    });
                } else {
                    setChartData({
                        labels: [],
                        datasets: []
                    });
                }
            } catch (err) {
                console.error(err.response ? err.response.data : err.message);
                setError('Failed to fetch tasks. Please check your connection and try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, [employeeId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Task Time Spent Over Time</h2>
            <Line data={chartData} />
        </div>
    );
};

export default TaskChart;