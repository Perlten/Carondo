import React, { Component } from "react"
<<<<<<< HEAD
import { PageHeader, Image, Button, Nav, NavItem } from 'react-bootstrap';
import logo from "./../../resources/logo.png"
import { parseJWT, getToken } from '../../facade/FacadeUtils';
import LogoutButton from "../LogoutButton"
import PieChart from "react-svg-piechart"

=======
import { PageHeader, Image, Button, Grid, Row, Col } from 'react-bootstrap';
import logo from "./../../resources/logo.png"
import { parseJWT, getToken } from './../../facade/FacadeUtils';
import LogoutButton from "./../LogoutButton"
import BrandGraph from "./BrandGraph"
>>>>>>> 1c64e3220e8d12fe37f31ea345abcea08a5dd745

export default class StatisticianPage extends Component {
  render() {
    console.log(this.props);

    const data = [
      {title: "Data 1", value: 100, color: "#22594e"},
      {title: "Data 2", value: 60, color: "#2f7d6d"},
      {title: "Data 3", value: 30, color: "#3da18d"},
      {title: "Data 4", value: 20, color: "#69c2b0"},
      {title: "Data 5", value: 10, color: "#a1d9ce"},
    ]
    return (

      <div style={{ marginLeft: 20, marginRight: 20 }}>
        <PageHeader>
          <LogoutButton history={this.props.history} style={{ float: "right", marginRight: 40 }} />
          <Image style={{ width: 310, height: 110 }} src={logo} />
          {' '}- STATISTICIAN
                </PageHeader>
<<<<<<< HEAD
        <CheckIfAdmin handleRoute={this.handleRoute} />
        <ReactSvgPieChart
          data={data}
          // // If you need expand on hover (or touch) effect
          // expandOnHover
          // // If you need custom behavior when sector is hovered (or touched)
          // onSectorHover={(d, i, e) => {
          //   if (d) {
          //     console.log("Mouse enter - Index:", i, "Data:", d, "Event:", e)
          //   } else {
          //     console.log("Mouse leave - Index:", i, "Event:", e)
          //   }
          // }
        />
      </div>
    );
  }
=======
                <CheckIfAdmin handleRoute={this.handleRoute} />
                <Grid>
                    <Row>
                        <Col md={6} xs={6}>
                            <BrandGraph />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
>>>>>>> 1c64e3220e8d12fe37f31ea345abcea08a5dd745

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