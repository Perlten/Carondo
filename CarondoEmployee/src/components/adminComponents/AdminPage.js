import React, { Component } from "react"
import CreateUser from "./CreateUser"
import ShowSelected from "./ShowSelected"
import ShowEmployees from "./ShowEmployees"
import { Grid, Row, Col, PageHeader, Image, Button } from 'react-bootstrap';
import empFacade from './../../facade/EmpCrudFacade';
import logo from "./../../resources/logo.png"
import LogoutButton from './../LogoutButton';
import UrlEdit from './UrlEdit'
import Header from '../Header'


export default class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = { selectedEmp: null, empList: [] }
    }

    render() {
        return (
            <div style={{ marginLeft: 20, marginRight: 20, marginBottom: 100 }}>
                <Header title="ADMIN" button="STATISTICS" {...this.props}/>
                <Grid>
                    <Row>
                        <Col md={4} xs={6}>
                            <ShowEmployees
                                empList={this.state.empList}
                                selectEmp={this.selectEmp}
                                fetchEmployees={this.fetchEmployees}
                                size={this.state.empList.length}
                            />

                        </Col>
                        <Col mdOffset={2} md={6} xs={6}>
                            <CreateUser fetchEmp={this.fetchEmployees} />
                            <UrlEdit />
                            <ShowSelected
                                emp={this.state.selectedEmp}
                                updateEmp={this.updateEmployees}
                                deleteEmp={this.deleteEmployee}
                            />
                        </Col>
                    </Row>
                </Grid>
            </div >
        );
    }

    updateEmployees = (emp) => {
        const empList = this.state.empList.map((e) => {
            return (e.id === emp.id) ? emp : e;
        })
        this.setState({ empList, selectedEmp: emp });
    }

    deleteEmployee = (emp) => {
        const empList = this.state.empList.filter((e) => {
            return e.id !== emp.id
        })
        this.setState({ empList, selectedEmp: null });
    }

    fetchEmployees = async () => {
        const res = await empFacade.getEmployees();
        if (res.status !== 200) {
            alert("Failed to fetch all employees");
            return;
        }
        this.setState({ empList: res.emp });
    }

    selectEmp = (selectedEmp) => {
        this.setState({ selectedEmp })
    }

   
}