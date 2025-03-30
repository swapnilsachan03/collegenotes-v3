import React from 'react';
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend } 
from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

export const LineChart = ({ subjectViews = [], blogViews = [], totalViews = [] }) => {
  const labels = getMonthsInOrder();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as "bottom",
      },
      title: {
        display: true,
        text: "Monthly Views"
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Total Views",
        data: totalViews,
        borderColor: "#2dd4bf",
        backgroundColor: "#2dd4bf"
      },

      {
        label: "Blog Views",
        data: blogViews,
        borderColor: "#fb7185",
        backgroundColor: "#fb7185"
      },

      {
        label: "Subjects & Notes Views",
        data: subjectViews,
        borderColor: "#00B5D8",
        backgroundColor: "#00B5D8"
      },
    ]
  };

  return <Line options={options} data={data} />;
}

export const DoughnutChart = () => {
  const data = {
    labels: ["Subscribed", "Not Subscribed"],
    datasets: [
      {
        label: "Views",
        data: [17, 30],
        borderColor: ["rgb(61, 12, 171)", "rgb(214, 43, 129)"],
        backgroundColor: ["rgba(61, 12, 171, 0.3)", "rgba(214, 43, 129, 0.3)"],
        borderWidth: 1
      }
    ]
  };

  return <Doughnut data={data} />
}

function getMonthsInOrder() {
  const labels = [];

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const currMonth = new Date().getMonth();

  for(let i = currMonth; i >= 0; i--) {
    const element = months[i];
    labels.unshift(element);
  }
  
  for (let i = 11; i > currMonth; i--) {
    const element = months[i];
    labels.unshift(element);
  }

  return labels;
}