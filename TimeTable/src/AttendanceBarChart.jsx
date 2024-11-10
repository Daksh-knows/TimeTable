import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AttendanceBarChart = ({ attendanceData }) => {
    // Process data to create labels and percentage values
    const labels = Object.keys(attendanceData).map(date => date.replace('/', '-')); // Format dates for labels
    const percentages = Object.values(attendanceData).map(([attended, total]) => 
        total > 0 ? ((attended / total) * 100).toFixed(2) : 0
    );

    // Configure the chart data
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Attendance (%)',
                data: percentages,
                backgroundColor: '#4CAF50', // Green color for bars
                borderColor: '#388E3C',
                borderWidth: 2,
                borderRadius: 5,
                barPercentage: 0.8, // Adjusts bar thickness
                hoverBackgroundColor: '#66BB6A',
            },
        ],
    };

    // Configure chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    font: {
                        size: 14,
                    },
                },
            },
            title: {
                display: true,
                text: 'Monthly Attendance Percentage',
                font: {
                    size: 20,
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.parsed.y}% attendance`,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month/Year',
                },
            },
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Attendance (%)',
                },
                ticks: {
                    stepSize: 10,
                },
            },
        },
    };

    return (
        <div style={{  width: '100%', maxWidth: '2000px', margin: '0'}}>
            <Bar data={data} options={options}/>
        </div>
    );
};

export default AttendanceBarChart;
