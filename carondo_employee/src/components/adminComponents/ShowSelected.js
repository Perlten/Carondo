import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import empFacade from './../../facade/EmpCrudFacade';

export default class ShowEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emp: this.props.emp,
            message: ""
        };
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
                <h2>{this.state.message}</h2>
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
                        <ControlLabel>Role</ControlLabel>
                        <RoleDropDownOptions role={this.state.emp.role} />
                        <Button onClick={this.handleSubmit}>Edit</Button>
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

    handleSubmit = async (e) => {
        e.preventDefault();
        const emp = this.state.emp;
        console.log(emp);
        const res = await empFacade.edit(emp);
        if (res.status !== 200) {
            this.setState({ message: res.fullError.errorMessage })
            return;
        }
        this.setState({ message: "Successful!" })
    }
}

function RoleDropDownOptions({ role }) {
    if (role === "admin") {
        return (
            <FormControl componentClass="select" placeholder="Role">
                <option defaultValue="admin" >Admin</option>
                <option value="statistician">Statistician</option>
            </FormControl>
        );
    }
    return (
        <FormControl componentClass="select" placeholder="Role">
            <option value="admin">Admin</option>
            <option defaultValue="statistician">Statistician</option>
        </FormControl>
    );
}