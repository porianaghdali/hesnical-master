"use client"

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({data,options}) => {
  // const data = {
  //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
  //   datasets: [
  //     {
  //       label: 'Votes',
  //       data: [12, 19, 3, 5, 2],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.6)',
  //         'rgba(54, 162, 235, 0.6)',
  //         'rgba(255, 206, 86, 0.6)',
  //         'rgba(75, 192, 192, 0.6)',
  //         'rgba(153, 102, 255, 0.6)',
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //     title: {
  //       display: true,
  //       text: 'Vote Distribution',
  //     },
  //   },
  // };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
