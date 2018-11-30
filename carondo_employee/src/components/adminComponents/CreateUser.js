import React, { Component } from "react"
import facade from "./../../facade/LoginFacade"
import { FormGroup, FormControl, ControlLabel, Button, Panel, Alert, DropdownButton, MenuItem } from 'react-bootstrap';

export default class CreateUser extends Component {
    constructor() {
        super()
        this.state = {
            create: { firstName: "", lastName: "", email: "", password: "", role: "admin" },
            message: "",
            toggle: false
        }
    }

    render() {
        //Used in the dropdown menu
        const role = this.state.create.role
        
        return (
            <div>
                <Panel onToggle={() => "TEST"} expanded={this.state.toogle}>
                    <Panel.Heading>
                        <Panel.Title onClick={this.toggleCollapse}>
                            <strong>Create User</strong>
                        </Panel.Title>
                        <Panel.Collapse>
                            <Panel.Body>
                                <ErrorMessage error={this.state.message} handleDismiss={() => this.setState({ message: "" })} />
                                <form>
                                    <FormGroup>
                                        <ControlLabel>
                                            First name
                                        </ControlLabel>
                                        <FormControl
                                            id="firstName"
                                            type="text"
                                            value={this.state.create.firstName}
                                            placeholder="First name"
                                            onChange={this.handleChange}
                                        />
                                        <ControlLabel>
                                            Last name
                                         </ControlLabel>
                                        <FormControl
                                            id="lastName"
                                            type="text"
                                            value={this.state.create.lastName}
                                            placeholder="Last name"
                                            onChange={this.handleChange}
                                        />
                                        <ControlLabel>
                                            Email
                                         </ControlLabel>
                                        <FormControl
                                            id="email"
                                            type="email"
                                            value={this.state.create.email}
                                            placeholder="Email"
                                            onChange={this.handleChange}
                                        />
                                        <ControlLabel>
                                            Password
                                       </ControlLabel>
                                        <FormControl
                                            id="password"
                                            type="password"
                                            value={this.state.create.password}
                                            placeholder="Password"
                                            onChange={this.handleChange}
                                        />
                                        <ControlLabel>Role</ControlLabel>
                                        <br />
                                        <DropdownButton
                                            bsStyle="primary"
                                            bsSize="small"
                                            title={role.charAt(0).toUpperCase() + role.slice(1)}
                                            id="role"
                                            onSelect={this.handleDropDown}
                                        >
                                            <MenuItem eventKey="admin" active={this.state.create.role === "admin"}>Admin</MenuItem>
                                            <MenuItem eventKey="statistician" active={this.state.create.role === "statistician"}>Statistician</MenuItem>
                                        </DropdownButton>
                                    </FormGroup>
                                    <Button bsStyle="success" onClick={this.handleSubmit}>Register</Button>
                                </form>
                            </Panel.Body>
                        </Panel.Collapse>
                    </Panel.Heading>
                </Panel>
            </div>
        );
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const body = this.state.create
        const res = await facade.create(body);
        if (res.status !== 200) {
            this.setState({ message: res.fullError.errorMessage })
            return;
        }
        this.props.fetchEmp();
        this.setState({ message: "Successful!" })
        const create = { firstName: "", lastName: "", email: "", password: "", role: "admin" };
        this.setState({ create });
        this.toggleCollapse();

    }

    toggleCollapse = () => {
        this.setState({ toogle: !this.state.toogle });
    }


    handleChange = (e) => {
        const value = e.target.value;
        let id = e.target.id;
        const create = this.state.create
        if (id === "") {
            id = e.target.name
        }
        create[id] = value;
        this.setState({ create, message: "" });
    }

    handleDropDown = (e) => {
        const create = this.state.create;
        create.role = e;
        this.setState({ create });
    }
}

function ErrorMessage({ error, handleDismiss }) {
    if (error) {
        return (
            <Alert bsStyle="danger" onDismiss={handleDismiss}><strong>{error}</strong> </Alert>
        );
    }
    return (
        <div></div>
    );
}