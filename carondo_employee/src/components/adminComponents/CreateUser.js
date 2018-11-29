import React, { Component } from "react"
import facade from "./../../facade/LoginFacade"
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

export default class CreateUser extends Component {
    constructor() {
        super()
        this.state = {
            create: { firstName: "", lastName: "", email: "", password: "", role: "admin" },
            message: ""
        }
    }

    render() {
        return (
            <div>
                <h1>Create user</h1>
                <h2 style={{ color: "red" }}>{this.state.message}</h2>
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
                        <FormControl componentClass="select" placeholder="Role">
                            <option defaultValue="admin" >Admin</option>
                            <option value="statistician">Statistician</option>
                        </FormControl>
                    </FormGroup>
                    <Button bsStyle="success" onClick={this.handleSubmit}>Register</Button>
                </form>

                {/* <form onSubmit={this.handleSubmit}>
                    <input required id="firstName" placeholder="First name" onChange={this.handleChange} value={this.state.create.firstName} />
                    <br />
                    <input required id="lastName" placeholder="Last name" onChange={this.handleChange} value={this.state.create.lastName} />
                    <br />
                    <input required id="email" type="email" placeholder="Email" onChange={this.handleChange} value={this.state.create.email} />
                    <br />
                    <input required id="password" type="password" placeholder="Password" onChange={this.handleChange} value={this.state.create.password} />
                    <br />
                    <label>
                        <input name="role" type="radio" value="admin"
                            checked={this.state.create.role === "admin"}
                            onChange={this.handleChange} />
                        Admin
                    </label>
                    <br />
                    <label>
                        <input name="role" type="radio" value="statistician"
                            checked={this.state.create.role === "statistician"}
                            onChange={this.handleChange} />
                        Statistician
                    </label>
                    <br />
                    <button>Register</button>
                </form> */}
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
        this.setState({ message: "Successful!" })
    }


    handleChange = (e) => {
        const value = e.target.value;
        let id = e.target.id;
        const create = this.state.create
        if (id === "") {
            id = e.target.name
        }
        create[id] = value;
        this.setState({ create });
    }
}