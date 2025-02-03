"use client"

import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Total Users Enrolled',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


export default function LineChart() {
  const [paidUserPerM, setPaidUserPerM] = useState<number[]>([]);
  const [freeUserPerM, setFreeUserPerM] = useState<number[]>([]);

  useEffect(() => {
    const fetchFreeUser = async () => {
      const response = await fetch("/admin/api/free-user-perm");
      const data = await response.json();

      const formattedData = Array(12).fill(0);
      data.usersPerMonth.forEach((item: { month: string; count: number }) => {
        const monthIdx = new Date(item.month).getMonth();
        formattedData[monthIdx] = item.count;
      });
      setFreeUserPerM(formattedData);
    }

    const fetchPaidUser = async () => {
      const response = await fetch("/admin/api/paid-user-perm");
      const data = await response.json();

      const formattedData = Array(12).fill(0);
      data.usersPerMonth.forEach((item: { month: string; count: number }) => {
        const monthIdx = new Date(item.month).getMonth();
        formattedData[monthIdx] = item.count;
      });
      setPaidUserPerM(formattedData);
    }

    fetchFreeUser();
    fetchPaidUser();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: 'Paid Users',
        data: paidUserPerM,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Free Users',
        data: freeUserPerM,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };


  return <Bar options={options} data={data} />;
}
