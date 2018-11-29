import React, { Component } from "react"
import CreateUser from "./CreateUser"
import ShowSelected from "./ShowSelected"
import ShowEmployees from "./ShowEmployees"
import { Grid, Row, Col } from 'react-bootstrap';
import empFacade from './../../facade/EmpCrudFacade';


export default class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = { selectedEmp: null, empList: [] }
    }

    render() {
        return (
            <div style={{ margin: 60 }}>
                <Grid>
                    <Row>
                        <Col md={4} xs={4}>
                            <ShowEmployees empList={this.state.empList} selectEmp={this.selectEmp} fetchEmployees={this.fetchEmployees} />
                            <CreateUser />
                        </Col>
                        <Col md={6} xs={6} xsOffset={2}>
                            <ShowSelected emp={this.state.selectedEmp} updateEmp={this.updateEmployees} />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

    updateEmployees = (emp) => {
        console.log(emp);
        const empList = this.state.empList.map((e) => {
            return(e.id === emp.id) ? emp : e;
        })
        this.setState({empList});
    }

    fetchEmployees = async () => {
        const res = await empFacade.getEmployees();
        if (res.status !== 200) {
            alert("FUCK!!");
            return;
        }
        this.setState({ empList: res.emp });
    }

    selectEmp = (selectedEmp) => {
        this.setState({ selectedEmp })
    }
}