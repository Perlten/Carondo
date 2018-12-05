import React, { Component } from "react"
import { Bar } from 'react-chartjs-2';

export default class BrandGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                labels: this.labels(props.brands),
                datasets: [
                    {
                        label: 'Brand popularity',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: this.values(props.brands)
                    }
                ]

            }
        }
    }

    labels = (brands) => {
        return brands.map((brand) => {
            return brand.brand;
        })
    }

    values = (brands) => {
        return brands.map((brand) => {
            return brand.value;
        })
    }

    render() {
        return (
            <div>
                <Bar
                    data={this.state.data}
                    // width={100}
                    // height={50}
                    // options={{
                    //     maintainAspectRatio: false
                    // }}
                />
            </div>
        )
    }
}