import React from "react";
import Styles from "../styles/Styles";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  ScrollView
} from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import Slider from "../components/Slider";
import SwitchSelector from "react-native-switch-selector";
import Color from "../components/Color";
import { Button } from "react-native-elements";
import { Container, Header, Content, Card, CardItem, Body , Fab} from "native-base";
import Icon from 'react-native-vector-icons/MaterialIcons';


export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: [400000, 2800000],
      seats: [2, 6],
      eco: "all",
      selectedColors: ["red", "blue", "black", "white", "silver", "green"],
      error: null
    };
  }

  updatePrice = price => {
    this.setState({
      price
    });
  };

  updateSeats = seats => {
    this.setState({
      seats
    });
  };

  updateEco = eco => {
    this.setState({
      eco
    });
  };

  colorFlip = value => {
    if (this.state.selectedColors.includes(value)) {
      const selectedColors = this.state.selectedColors.filter(
        val => val != value
      );
      this.setState({ selectedColors });
    } else {
      const arr = this.state.selectedColors;
      arr.push(value);

      this.setState({
        selectedColors: arr
      });
    }
  };

  render() {
    const options = [
      { label: "All", value: "all" },
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" }
    ];

    return (
      <>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View style={Styles.container}>
            <View style={{paddingBottom:10}}>
              <Image
                  style={Styles.image}
                  source={require("../pics/carondo.png")}
                />
            </View>
              
              <Card>
                <CardItem header>
                  <Text style={Styles.title}>Seats</Text>
                </CardItem>
                <CardItem>
                  <Body>
                    <Slider
                      onChange={this.updateSeats}
                      min={1}
                      max={8}
                      values={this.state.seats}
                      unit={" seats"}
                      label={"Seats"}
                      step={1}
                    />
                  </Body>
                </CardItem>
              </Card>

              <Card>
                <CardItem header>
                  <Text style={Styles.title}>Colors</Text>
                </CardItem>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Color
                        selectedColors={this.state.selectedColors}
                        value={"red"}
                        colorCode={"red"}
                        fileName={"white"}
                        colorFlip={this.colorFlip}
                      />
                      <Color
                        selectedColors={this.state.selectedColors}
                        value={"blue"}
                        colorCode={"blue"}
                        fileName={"white"}
                        colorFlip={this.colorFlip}
                      />
                      <Color
                        selectedColors={this.state.selectedColors}
                        value={"black"}
                        colorCode={"black"}
                        fileName={"white"}
                        colorFlip={this.colorFlip}
                      />
                      <Color
                        selectedColors={this.state.selectedColors}
                        value={"silver"}
                        colorCode={"silver"}
                        fileName={"black"}
                        colorFlip={this.colorFlip}
                      />
                      <Color
                        selectedColors={this.state.selectedColors}
                        value={"white"}
                        colorCode={"white"}
                        fileName={"black"}
                        colorFlip={this.colorFlip}
                      />
                      <Color
                        selectedColors={this.state.selectedColors}
                        value={"green"}
                        colorCode={"green"}
                        fileName={"white"}
                        colorFlip={this.colorFlip}
                      />
                    </View>
                  </Body>
                </CardItem>
              </Card>

              <Card>
                <CardItem header>
                  <Text style={Styles.title}>Price</Text>
                </CardItem>
                <CardItem>
                  <Body>
                    <Slider
                      onChange={this.updatePrice}
                      min={1000}
                      max={3000000}
                      values={this.state.price}
                      unit={"$"}
                      label={"Price"}
                      step={1000}
                    />
                  </Body>
                </CardItem>
              </Card>

              <Card>
                <CardItem header>
                  <Text style={Styles.title}>Eco-Friendly</Text>
                </CardItem>
                <CardItem>
                  <Body>
                    <SwitchSelector
                      options={options}
                      initial={0}
                      onPress={this.updateEco}
                    />
                  </Body>
                </CardItem>
              </Card>
            </View>
          </ScrollView>
          <Fab
                style={{ backgroundColor: 'dodgerblue' }}
                position="bottomRight"
                onPress={() =>
                  this.props.navigation.navigate("Results", {
                    price: this.state.price,
                    seats: this.state.seats,
                    eco: this.state.eco,
                    colors: this.state.selectedColors
                  })
                }>
                
                <Icon name="search"/>
              </Fab>
          {/* <View style={Styles.container2}>
            <View style={Styles.container3}>
              <Button
                raised
                large
                onPress={() =>
                  this.props.navigation.navigate("Results", {
                    price: this.state.price,
                    seats: this.state.seats,
                    eco: this.state.eco,
                    colors: this.state.selectedColors
                  })
                }
                backgroundColor="dodgerblue"
                icon={{ name: "search" }}
                title="Search"
              />
            </View>
          </View> */}
        </View>
      </>
    );
  }
}
