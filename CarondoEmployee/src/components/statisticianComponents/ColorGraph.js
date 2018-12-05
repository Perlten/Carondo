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
        }]
    }
    return (
        <div style={{backgroundColor: "#f1f1f1"}}>
            <h2>Doughnut Example</h2>
            <Doughnut data={data} />
        </div>
    );

}