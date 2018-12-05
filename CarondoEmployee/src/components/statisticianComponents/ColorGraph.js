import { Doughnut } from 'react-chartjs-2';
import React from 'react';

export default function ColorGraph({ colors }) {
    if (!colors) return null;

    const labels = colors.map((color) => color.color);
    const dataSets = colors.map((color) => color.value);

    const data = {
        labels,
        datasets: [{
            data: dataSets,
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ]
        }]
    }
    return (
        <div>
            <h2>Doughnut Example</h2>
            <Doughnut data={data} />
        </div>
    );

}