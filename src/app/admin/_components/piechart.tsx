"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
    const [paidUsers, setPaidUsers] = useState(0);
    const [freeUsers, setFreeUsers] = useState(0);

    const data = {
        labels: ["PAID USERS", "FREE USERS"],
        datasets: [
            {
                label: "Users",
                data: [paidUsers, freeUsers],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    useEffect(() => {
        const fetchPaidUsers = async () => {
            const response = await fetch("/admin/api/paid-users");
            const data = await response.json();
            setPaidUsers(data.count);
        };

        const fetchFreeUsers = async () => {
            const response = await fetch("/admin/api/free-users");
            const data = await response.json();
            setFreeUsers(data.count);
        };

        fetchPaidUsers();
        fetchFreeUsers();
    }, []);

    return <Pie data={data} />;
}

export default PieChart;
