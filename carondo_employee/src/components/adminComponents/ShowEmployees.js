import React, { Component } from "react";
import { Panel, Button } from 'react-bootstrap';

export default class ShowEmployees extends Component {
    constructor(props) {
        super(props);
        this.props.fetchEmployees();
    }

    render() {
        return (
            <div>
                <CreateEmpPanels emp={this.props.empList} selectEmp={this.props.selectEmp} />
            </div>
        );
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
                <Panel.Body>
                    <Button bsStyle="info" onClick={() => selectEmp(element)}>Information</Button>{' '}
                    {`${element.firstName} ${element.lastName}`}
                </Panel.Body>
            </Panel>
        );
    });
    return res;
}