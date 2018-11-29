import React, { Component } from "react";
import { Panel, Button } from 'react-bootstrap';
import empFacade from './../../facade/EmpCrudFacade';

export default class ShowEmployees extends Component {
    constructor(props) {
        super(props);
        this.state = { emp: [] }
        this.fetchEmployees();
    }

    render() {
        return (
            <div>
                <CreateEmpPanels emp={this.state.emp} selectEmp={this.props.selectEmp} />
            </div>
        );
    }

    fetchEmployees = async () => {
        const res = await empFacade.getEmployees();
        if (res.status !== 200) {
            alert("FUCK!!");
            return;
        }
        this.setState({ emp: res.emp });
    }
}

function CreateEmpPanels({ emp, selectEmp }) {
    if (emp.length === 0) {
        return (
            <div></div>
        );
    }
    const res = emp.map((element) => {
        return (
            <Panel key={element.id} >
                <Panel.Body>{`${element.firstName} ${element.lastName} `}
                <Button bsStyle="success" onClick={() => selectEmp(element)}> Edit</Button> </Panel.Body>
            </Panel>
        );
    });
    return res;
}