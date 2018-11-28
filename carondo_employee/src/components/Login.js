import React, { Component } from "react";
import facade from './../facade/LoginFacade';
import {parseJWT} from './../facade/FacadeUtils';
import { Link } from 'react-router-dom';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            login: {
                email: "jesper@gmail.com",
                password: "admin"
            },
            error: ""
        }
    }

    render() {
        return (
            <div>
                <h2 style={{ color: "red" }}>{this.state.error}</h2>
                <form onSubmit={this.handleSubmit}>
                    <input id="email" placeholder="Email" onChange={this.handleChange} value={this.state.login.email} />
                    <br />
                    <input id="password" placeholder="Password" onChange={this.handleChange} value={this.state.login.password} />
                    <br />
                    <button>Login</button>
                </form>
            </div>
        );
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = this.state.login;
        const res = await facade.login(email, password);
        if (res.status !== 200) {
            this.setState({ error: "Could not login" })
            return;
        }
        console.log(parseJWT(res.token));
        // this.props.history.push('/adminPage');
    }


    handleChange = (e) => {
        const value = e.target.value;
        const id = e.target.id;
        const login = this.state.login
        login[id] = value;
        this.setState({ login });
    }

}