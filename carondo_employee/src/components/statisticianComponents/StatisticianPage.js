import React, { Component } from "react"
import { PageHeader, Image, Button } from 'react-bootstrap';
import logo from "./../../resources/logo.png"
import { parseJWT, getToken } from './../../facade/FacadeUtils';
import LogoutButton from "./../LogoutButton"

export default class StatisticianPage extends Component {
    render() {
        console.log(this.props);

        return (
            <div style={{ marginLeft: 20, marginRight: 20 }}>
                <PageHeader>
                    <LogoutButton history={this.props.history} style={{ float: "right", marginRight: 40 }} />
                    <Image style={{ width: 310, height: 110 }} src={logo} />
                    {' '}- STATISTICIAN PANEL INTERFACE
                </PageHeader>
                <CheckIfAdmin handleRoute={this.handleRoute} />
            </div>
        );
    }

    handleRoute = (e) => {
        e.preventDefault()
        const history = this.props.history
        history.push('/adminPage')
    }
}

function CheckIfAdmin({ handleRoute }) {
    const tokenTxt = getToken();
    const token = parseJWT(tokenTxt)
    if (token.role === "admin") {
        return <div style={{ marginBottom: 20 }}><Button bsStyle="success" onClick={handleRoute}>ADMIN</Button></div>
    }
    return <div></div>
}