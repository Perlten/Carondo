import React, { Component } from "react"
import { Bar } from 'react-chartjs-2';

export default class BrandGraph extends Component {
    labels = (brands) => {
        return brands.map((brand) => {
            console.log(brand.brand);

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
                    data={
                        {
                            labels: this.labels(this.props.brands),
                            datasets: [
                                {
                                    label: 'Brand popularity',
                                    backgroundColor: 'teal',
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    hoverBackgroundColor: 'grey',
                                    hoverBorderColor: 'black',
                                    data: this.values(this.props.brands)
                                }
                            ]

                        }
                    }
                />
            </div>
        )
    }
}