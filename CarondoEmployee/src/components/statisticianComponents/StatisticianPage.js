import React, { Component } from "react"
import { PageHeader, Image, Button, Grid, Row, Col } from 'react-bootstrap';
import logo from "./../../resources/logo.png"
import { parseJWT, getToken } from './../../facade/FacadeUtils';
import LogoutButton from "./../LogoutButton"
import BrandGraph from "./BrandGraph"
import ColorGraph from './ColorGraph';
import StatFacade from './../../facade/StatsFacade';

export default class StatisticianPage extends Component {

    constructor(props){
        super(props);
        this.state = {stats: null};
        this.fetchData();
    }

    componentDidMount(){
        setInterval(this.fetchData, 15000);
    }

    render() {
        if(!this.state.stats) return null;

        return (
            <div style={{ marginLeft: 20, marginRight: 20 }}>
                <PageHeader>
                    <LogoutButton history={this.props.history} style={{ float: "right", marginRight: 40 }} />
                    <Image style={{ width: 310, height: 110 }} src={logo} />
                    {' '}- STATISTICIAN PANEL INTERFACE
                </PageHeader>
                <CheckIfAdmin handleRoute={this.handleRoute} />
                <Grid>
                    <Row>
                        <Col md={6} xs={6}>
                            <BrandGraph brands={this.state.stats.brandList} />
                            <ColorGraph colors={this.state.stats.colorList} />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

    fetchData = async () => {
        const res = await StatFacade.getStatistics();
        if(res.status !== 200){
            return;
        }
        this.setState({stats: res.stats});
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