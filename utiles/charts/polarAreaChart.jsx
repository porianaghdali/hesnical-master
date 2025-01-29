"use client"

import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarAreaChart = ({data,options}) => {
//   const data = {
//     labels: ['Red', 'Green', 'Yellow', 'Blue', 'Purple'],
//     datasets: [
//       {
//         data: [11, 16, 7, 3, 14],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.6)',
//           'rgba(75, 192, 192, 0.6)',
//           'rgba(255, 206, 86, 0.6)',
//           'rgba(54, 162, 235, 0.6)',
//           'rgba(153, 102, 255, 0.6)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Polar Area Chart',
//       },
//     },
//   };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <PolarArea data={data} options={options} />
    </div>
  );
};

export default PolarAreaChart;
