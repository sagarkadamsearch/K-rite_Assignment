import React from 'react';
import { Bar } from 'react-chartjs-2';

function Chart() {
  const data = {
    labels: ['A', 'CNAME', 'MX', 'TXT'],
    datasets: [
      {
        label: 'Record Types Distribution',
        data: [30, 20, 15, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category', // Ensure 'category' scale is specified
        title: {
          display: true,
          text: 'Record Types',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
  };

  return (
    <div>
      <h2>Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default Chart;
