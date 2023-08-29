import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './DonutChart.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ fdAmount, rdAmount }) => {
  const totalAmount = fdAmount + rdAmount;
  const fdPercent = ((fdAmount / totalAmount) * 100).toFixed(2);
  const rdPercent = ((rdAmount / totalAmount) * 100).toFixed(2);

  const data = {
    labels: ['Fixed Deposit', 'Recurring Deposit'],
    datasets: [
      {
        data: [fdPercent, rdPercent],
        backgroundColor: ['#3498db', '#e74c3c'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
    },
  };

  return (
    <div className="donut-chart-container">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
