import React, { Component } from "react"
import { PageHeader, Image, Button, Grid, Row, Col } from 'react-bootstrap';
import logo from "./../../resources/logo.png"
import { parseJWT, getToken } from './../../facade/FacadeUtils';
import LogoutButton from "./../LogoutButton"
import BrandGraph from "./BrandGraph"
import ColorGraph from './ColorGraph';
import StatFacade from './../../facade/StatsFacade';
import WeekdayGraph from './WeekdayGraph'
import PriceRangeGraph from './PriceRangeGraph'
import Header from '../Header'

export default class StatisticianPage extends Component {

  constructor(props) {
    super(props);
    this.state = { stats: null };
    this.fetchData();
  }

  componentDidMount() {
    setInterval(this.fetchData, 5000);
  }

  render() {
    if (!this.state.stats) return null;

    return (
      <div style={{ marginLeft: 20, marginRight: 20 }}>
        <Header title="STATISTICS" button="ADMIN" {...this.props} />
        
        <Grid>
          <Row>
            <Col md={12} xs={12} >
              <h2>Brand popularity</h2>
              <BrandGraph brands={this.state.stats.brandList} />
            </Col>
            <Col md={12} xs={12}>
              <Row>
                <Col md={6} xs={12}>
                  <h2>Weekday Total Searches</h2>

                  <WeekdayGraph dates={this.state.stats.dateList} />
                </Col>
                <Col md={6} xs={12}>
                  <h2>Color popularity by search</h2>
                  <ColorGraph colors={this.state.stats.colorList} />
                </Col>
              </Row>
              <br />
            </Col>

            <Col md={12} xs={12}>
              <h2>Price Range Popularity</h2>
              <PriceRangeGraph priceRanges={this.state.stats.priceRangeList} />
            </Col>
          </Row>
        </Grid>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }

  fetchData = async () => {
    const res = await StatFacade.getStatistics();
    if (res.status !== 200) {
      return;
    }
    this.setState({ stats: res.stats });
    console.log(this.state);
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