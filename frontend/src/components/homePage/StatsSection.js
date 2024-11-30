import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
  } from 'chart.js';
  
// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);
  

const StatsSection = () => {
  // Data for Bar Chart
  const barData = {
    labels: ['2019', '2020', '2021', '2022', '2023','2024'],
    datasets: [
      {
        label: 'Student Enrollments',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        data: [340, 358, 340, 350, 379,360],
      },
    ],
  };

  // Data for Pie Chart
  const pieData = {
    labels: ['Projects Completed', 'Research Papers', 'Workshops Held'],
    datasets: [
      {
        data: [300, 120, 50],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const pieOptions = {
    responsive: true, // Makes the chart responsive to its container
    maintainAspectRatio: true, // Maintain the aspect ratio based on the aspectRatio value
    aspectRatio: 1.6, // Adjust the chart’s dimensions (1 is square; smaller values make it taller, larger values make it wider)
    plugins: {
      legend: {
        position: 'top', // Keeps the legend at the top
        labels: {
          font: {
            size: 14, // Customize font size of the legend
          },
          color: '#4B5563', // Tailwind gray-600 for better readability
          padding: 15, // Adds space around legend items
        },
      },
      tooltip: {
        enabled: true, // Enables tooltips for better interaction
        backgroundColor: '#1E293B', // Dark blue-gray background for the tooltip
        titleFont: {
          size: 16,
          weight: 'bold',
        },
        bodyFont: {
          size: 14,
        },
        padding: 10, // Add padding inside tooltips
      },
    },
    layout: {
      padding: {
        top: 20, // Adds space above the chart
        bottom: 20, // Adds space below the chart
      },
    },
  };
  


  return (
    <section className="bg-indigo-200 py-10">
      <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center text-indigo-600 mb-10">
        Department <span className="text-indigo-500">Statistics</span>
      </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <Card className="shadow-lg">
            <CardContent>
              <Typography variant="h6" className="text-center font-semibold mb-4">
                Student Enrollments in CSE Over Years
              </Typography>
              <Bar
                data={barData}
                options={{
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: 'top',
                    },
                  },
                }}
              />
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card className="shadow-lg">
            <CardContent>
              <Typography variant="h6" className="text-center font-semibold mb-4">
                Department Achievements
              </Typography>
              <Pie
                data={pieData}
                options={pieOptions}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;