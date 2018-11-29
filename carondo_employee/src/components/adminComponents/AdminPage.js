import React, { Component } from "react"
import CreateUser from "./CreateUser"
import { Grid, Row, Col } from 'react-bootstrap';

export default class AdminPage extends Component {
    render() {
        return (
            <div>
                <Grid>
                    <Row>
                        <Col md={6}>
                        </Col>
                        <Col md={6}>
                            <CreateUser />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}