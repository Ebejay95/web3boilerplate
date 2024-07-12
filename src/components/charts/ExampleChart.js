import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const data = {
  labels: ['Januar', 'Februar', 'März', 'April', 'Mai'],
  datasets: [
    {
      label: 'Verkauf',
      data: [12, 19, 3, 5, 2],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const ExampleChart = () => (
  <div>
    <Bar data={data} options={options} />
  </div>
);

export default ExampleChart;