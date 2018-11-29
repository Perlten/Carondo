import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export default class ShowEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = { emp: this.props.emp };
    }

    componentWillReceiveProps(nextProps) {
        const emp = JSON.parse(JSON.stringify(nextProps.emp));
        this.setState({ emp });
    }

    render() {
        if (!this.props.emp) {
            return <div></div>
        }
        console.log(this.state);
        return (
            <div>
                <form>
                    <FormGroup>
                        <ControlLabel>
                            Id
                        </ControlLabel>
                        <FormControl
                            id="id"
                            type="text"
                            value={this.state.emp.id}
                            disabled
                        />
                        <ControlLabel>
                            First name
                        </ControlLabel>
                        <FormControl
                            id="firstName"
                            type="text"
                            value={this.state.emp.firstName}
                            placeholder="First name"
                            onChange={this.handleChange}
                        />
                        <ControlLabel>
                            Last name
                        </ControlLabel>
                        <FormControl
                            id="lastName"
                            type="text"
                            value={this.state.emp.lastName}
                            placeholder="Last name"
                            onChange={this.handleChange}
                        />
                        <ControlLabel>
                            Email
                        </ControlLabel>
                        <FormControl
                            id="email"
                            type="email"
                            value={this.state.emp.email}
                            placeholder="Email"
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                </form>
            </div >
        );
    }

    handleChange = (e) => {
        const value = e.target.value;
        const id = e.target.id;
        const emp = this.state.emp
        emp[id] = value;
        this.setState({ emp });
    }
}