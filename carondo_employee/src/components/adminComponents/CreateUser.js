import React, { Component } from "react"
import facade from "./../../facade/LoginFacade"

export default class CreateUser extends Component {
    constructor() {
        super()
        this.state = {
            create: { firstName: "", lastName: "", email: "", password: "", role: "admin" },
            message: ""
        }
    }

    render() {
        const { firstName, lastName, email, password } = this.state.create;
        const isEnabled =
            firstName.length > 0 && lastName.length > 0 && email.length > 0 && email.includes("@") && password.length > 0;
        return (
            <div>
                <h1>Admin page!</h1>
                <h2 style={{ color: "red" }}>{this.state.message}</h2>
                <form onSubmit={this.handleSubmit}>
                    <input id="firstName" placeholder="First name" onChange={this.handleChange} value={this.state.create.firstName} />
                    <br />
                    <input id="lastName" placeholder="Last name" onChange={this.handleChange} value={this.state.create.lastName} />
                    <br />
                    <input id="email" placeholder="Email" onChange={this.handleChange} value={this.state.create.email} />
                    <br />
                    <input id="password" placeholder="Password" onChange={this.handleChange} value={this.state.create.password} />
                    <br />
                    <label>
                        <input id="role" type="radio" value="admin"
                            checked={this.state.create.role === "admin"}
                            onChange={this.handleChange} />
                        Admin
                    </label>
                    <br />
                    <label>
                        <input id="role" type="radio" value="statistician"
                            checked={this.state.create.role === "statistician"}
                            onChange={this.handleChange} />
                        Statistician
                    </label>
                    <br />
                    <button disabled={!isEnabled}>Register</button>
                </form>
            </div>
        );
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const body = this.state.create
        const res = await facade.create(body);
        console.log(res);
        if (res.status !== 200) {
            this.setState({ message: res.fullError.errorMessage })
            return;
        }
        this.setState({message: "Successful!"})
    }


    handleChange = (e) => {
        const value = e.target.value;
        const id = e.target.id;
        const create = this.state.create
        create[id] = value;
        this.setState({ create });
    }
}