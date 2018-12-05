import { Doughnut } from 'react-chartjs-2';
import React from 'react';

export default function ColorGraph({ colors }) {
    if (!colors) return null;

    const labels = colors.map((color) => color.color);
    const dataSets = colors.map((color) => color.value);
    const color = colors.map((color) => color.color.toLowerCase());

    const data = {
        labels,
        datasets: [{
            data: dataSets,
            backgroundColor: color,
            borderWidth: 0.2,
            borderColor: 'black'
        }]
    }
    return (
        <div>
            <Doughnut data={data} />
        </div>
    );

}