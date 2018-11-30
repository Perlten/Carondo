import React, { Component } from "react";
import { Panel, Button } from 'react-bootstrap';

export default class ShowEmployees extends Component {
    constructor(props) {
        super(props);
        this.props.fetchEmployees();
        this.state = { start: 0, end: 3 };
    }

    render() {
        console.log(this.props.size);
        const { start, end } = this.state;
        return (
            <div>
                <CreateEmpPanels start={start} end={end} emp={this.props.empList} selectEmp={this.props.selectEmp} />
                <PaginationButtons next={this.pagiNext} back={this.pagiBack} start={start} end={end} size={this.props.size} />
                <br />
            </div>
        );
    }

    pagiNext = () => {
        const start = this.state.start + 4;
        const end = this.state.end + 4;
        this.setState({ start, end });
    }

    pagiBack = () => {
        const start = this.state.start - 4;
        const end = this.state.end - 4;
        this.setState({ start, end });

    }
}

function PaginationButtons({ back, next, start, end, size }) {
    return (
        <div style={{ width: 200, margin: "auto" }}>
            <Button disabled={start === 0} onClick={back} bsStyle="primary">Back</Button>
            <Button disabled={end >= size} onClick={next} style={{ float: "right" }} bsStyle="primary">Next</Button>
        </div>
    );
}

function CreateEmpPanels({ emp, selectEmp, start, end }) {
    if (emp.length === 0) {
        return (
            <div></div>
        );
    }
    console.log(start + " " + end)
    const res = emp.map((element, index) => {
        if (index >= start && index <= end) {
            return (
                <Panel key={index} >
                    <Panel.Body>
                        <Button bsStyle="info" onClick={() => selectEmp(element)}>Information</Button>{' '}
                        {`${element.firstName} ${element.lastName}`}
                    </Panel.Body>
                </Panel>
            );
        }
        return null;
    });
    return res;
}