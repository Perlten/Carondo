import React, { Component } from "react";
import facade from './../facade/LoginFacade';
import { parseJWT } from './../facade/FacadeUtils';
import { Button, ControlLabel, FormControl, FormGroup, Alert } from 'react-bootstrap';
import logo from './../resources/logo.png';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            login: {
                email: "jesper@gmail.com",
                password: "addmin"
            },
            error: "",
        }
    }


    render() {
        return (
            <div>
                <img src={logo} alt="error" style={style.imageStyle} />
                <div style={style.centerContainer}>
                    <ErrorMessage error={this.state.error} handleDismiss={() => this.setState({error: ""})}/>
                    <form onKeyUp={this.enterPress}>
                        <FormGroup>
                            <ControlLabel>
                                Email
                        </ControlLabel>
                            <FormControl
                                id="email"
                                type="email"
                                value={this.state.login.email}
                                placeholder="Enter Email"
                                onChange={this.handleChange}
                                style={style.formInput}
                            />
                        </FormGroup>
                        <FormGroup >
                            <ControlLabel>
                                Password
                        </ControlLabel>
                            <FormControl
                                id="password"
                                type="password"
                                value={this.state.login.password}
                                placeholder="Enter Password"
                                onChange={this.handleChange}
                                style={style.formInput}
                            />
                        </FormGroup>
                        <Button onClick={this.handleSubmit} bsStyle="success">Login</Button>
                    </form>
                </div>
            </div>
        )
    }

    enterPress = (e) => {
        e.preventDefault();
        if(e.keyCode === 13){
            this.handleSubmit(e);
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = this.state.login;
        const res = await facade.login(email, password);
        if (res.status !== 200) {
            this.setState({ error: res.fullError.errorMessage })
            return;
        }
        const token = parseJWT(res.token);
        const history = this.props.history
        token.role === "admin" ? history.push('/adminPage') : history.push('/statisticianPage')
    }
    
    handleChange = (e) => {
        const value = e.target.value;
        const id = e.target.id;
        const login = this.state.login
        login[id] = value;
        this.setState({ login });
    }
}

function ErrorMessage({error, handleDismiss}) {
    if (error) {
        return (
            <Alert bsStyle="danger" onDismiss={handleDismiss}><strong>{error}</strong> </Alert>
        );
    }
    return (
        <div></div>
    );
}

const style = {
    formInput: {
        borderWidth: "2px",
        borderColor: "black",
        borderStyle: "solid",
        padding: 4,
        maxWidth: 250
    },
    centerContainer: {
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    imageStyle: {
        width: 700,
        position: 'absolute', left: '50%',
        transform: 'translate(-50%)'
    }
}
