import React from "react"
import { Grid, Row, Col, PageHeader, Image, Button } from 'react-bootstrap';
import logo from "../resources/logo.png"
import LogoutButton from '../components/LogoutButton';
import { parseJWT, getToken } from './../facade/FacadeUtils';



export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <PageHeader>
                <Row>
                    <Col md={12}>
                        <LogoutButton history={this.props.history} style={{ float: "right" }} />
                        {this.getButton()}
                    </Col>

                    <Col md={12}>
                        <div style={{ margin: "auto", textAlign: "center" }}>
                            <Image style={{ width: 310, height: 110, }} src={logo} />
                            <p>{this.props.title}</p>
                        </div>
                    </Col>
                    
                </Row>
            </PageHeader>
        )
    }
    handleRoute = (e) => {
        e.preventDefault()
        const history = this.props.history
        history.push('/' + this.props.button.toLowerCase() + 'Page')
    }
    getButton = () => {
        if (this.props.button == "ADMIN") {
            const tokenTxt = getToken();
            const token = parseJWT(tokenTxt)
            console.log('role: ' + token.role)
            if (token.role !== "admin") {
                return <div></div>
            }
        }
        return <Button bsStyle="info" onClick={this.handleRoute}>{this.props.button}</Button>

    }
}

