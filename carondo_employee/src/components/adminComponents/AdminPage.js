import React, { Component } from "react"
import CreateUser from "./CreateUser"
import ShowSelected from "./ShowSelected"
import ShowEmployees from "./ShowEmployees"
import { Grid, Row, Col } from 'react-bootstrap';

export default class AdminPage extends Component {

    constructor(props){
        super(props);
        this.state = {selectedEmp: null}
    }

    render() {
        return (
            <div style={{margin: 60}}>
                <Grid>
                    <Row>
                        <Col md={4} xs={4}>
                        <ShowEmployees selectEmp={this.selectEmp}/>
                        </Col>
                        <Col md={6} xs={6} xsOffset={2}>
                        <ShowSelected emp={this.state.selectedEmp} />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

    selectEmp = (selectedEmp) => {
        console.log(selectedEmp);
        this.setState({selectedEmp})
    }
}