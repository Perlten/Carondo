import React, { Component } from "react"
import CreateUser from "./CreateUser"
import ShowSelected from "./ShowSelected"
import ShowEmployees from "./ShowEmployees"
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import empFacade from './../../facade/EmpCrudFacade';


export default class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = { selectedEmp: null, empList: [] }
    }

    render() {
        return (
            <div style={{ margin: 60 }}>
                <PageHeader style={{ textAlign: 'center' }}>
                    Admin panel overview <small>Carondo A/S</small>
                </PageHeader>;
        <Grid>
                    <Row>
                        <Col md={4} xs={4}>
                            {/* <h1>Admin page</h1> */}
                            <ShowEmployees
                                empList={this.state.empList}
                                selectEmp={this.selectEmp}
                                fetchEmployees={this.fetchEmployees}
                                size={this.state.empList.length}
                            />

                        </Col>
                        <Col md={6} xs={6} mdOffset={2}>
                            <CreateUser fetchEmp={this.fetchEmployees} />
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