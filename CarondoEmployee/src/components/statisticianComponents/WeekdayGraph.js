import { Radar } from 'react-chartjs-2';
import React from 'react';

export default function ColorGraph({ dates }) {
    if (!dates) return null;

    const labels = dates.map((day) => day.day)
    const values = dates.map((day) => day.value)

    console.log(dates)
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Weekday total searches',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                pointBackgroundColor: 'rgba(255,99,132,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255,99,132,1)',
                data: values
              }
        ]
      };
    return (
        <div>
            <Radar data={data} />
        </div>
    );

}