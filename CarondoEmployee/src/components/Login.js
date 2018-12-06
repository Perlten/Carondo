import React, { Component } from "react";
import facade from './../facade/LoginFacade';
import { parseJWT } from './../facade/FacadeUtils';
import { Button, ControlLabel, FormControl, FormGroup, Alert, Image, Grid, Row, Col } from 'react-bootstrap';
import logo from './../resources/logo.png';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: {
                email: "jesper@gmail.com",
                password: "admin"
            },
            error: "",
        }
    }

    render() {
        return (
            <div>
                <Grid >
                    <Row>
                        <Col md={12} style={style.center}>
                            <Image src={logo} alt="error" style={{ margin: "auto", width: "95%", maxWidth: 500, }} />
                        </Col>
                        <Col md={12} style={style.center}>
                            <h1>Employee Portal</h1>
                        </Col>
                        <Col md={12}>
                        <br/>
                            <ErrorMessage error={this.state.error} handleDismiss={() => this.setState({ error: "" })} />
                            <form onKeyUp={this.enterPress} style={style.formInput}>
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
                                    />
                                </FormGroup>
                                <Button onClick={this.handleSubmit} bsStyle="success">Login</Button>
                            </form>
                        </Col>

                    </Row>
                </Grid>




                <div>

                </div>
            </div>
        )
    }

    enterPress = (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
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
        token.role === "admin" ? history.push('/adminPage') : history.push('/statisticsPage')
    }

    handleChange = (e) => {
        const value = e.target.value;
        const id = e.target.id;
        const login = this.state.login
        login[id] = value;
        this.setState({ login });
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

const style = {
    formInput: {
        padding: 4,
        maxWidth: 250,
        margin: "auto"
    },
    centerContainer: {
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    imageStyle: {
        width: 700,
        position: 'absolute', left: '50%',
        transform: 'translate(-50%)'
    },
    center: {
        justifyContent: "center", alignItems: "center", display: "flex"
    }
}
