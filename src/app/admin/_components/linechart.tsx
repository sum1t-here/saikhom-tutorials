"use client"

import React from 'react';
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

export const data = {
  labels,
  datasets: [
    {
        label: 'Paid Users',
        data: [12, 19, 3, 5, 2, 3, 4, 5, 6, 7, 8, 9],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Free Users',
      data: [12, 19, 3, 5, 2, 3, 4, 5, 6, 7, 8, 9],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function LineChart() {
  return <Bar options={options} data={data} />;
}