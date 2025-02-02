"use client"
import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = ({data}) => {
  // const data = {
  //   labels: ['Speed', 'Strength', 'Agility', 'Intelligence', 'Charisma', 'Endurance'],
  //   datasets: [
  //     {
  //       label: 'Player A',
  //       data: [85, 90, 75, 70, 80, 95],
  //       backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //       borderColor: 'rgba(255, 99, 132, 1)',
  //       borderWidth: 2,
  //     },
  //     {
  //       label: 'Player B',
  //       data: [65, 75, 70, 80, 90, 85],
  //       backgroundColor: 'rgba(54, 162, 235, 0.2)',
  //       borderColor: 'rgba(54, 162, 235, 1)',
  //       borderWidth: 2,
  //     },
  //   ],
  // };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Radar Chart Comparison',
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 50,
        suggestedMax: 100,
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;
