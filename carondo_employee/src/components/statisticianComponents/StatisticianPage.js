import React, { Component } from "react"
import { PageHeader } from 'react-bootstrap';

export default class StatisticianPage extends Component {
    render() {
        return(
            <div>
                <PageHeader style={{ textAlign: 'center' }}>
                    Admin panel overview <small>Carondo A/S</small>
                </PageHeader>
            </div>
        );
    }
}