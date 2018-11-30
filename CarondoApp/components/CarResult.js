import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Right,
} from "react-native";

export default class CarResult extends React.Component {
  constructor(props) {
    super(props);
  }

  carTouched = () => {
    this.props.navigate.navigate("CarView", { car: this.props.car });
  };

  render() {
    const car = this.props.car;

    return (
        <TouchableHighlight style={Styles.touchable} underlayColor={"white"} onPress={this.carTouched}>
        <View style={Styles.container}>

          <Image style={Styles.image} source={{ uri: car.imageURL }} />
          <View style={Styles.view}>
            <View style={{ flex: 9 }}>
              <View style={{ paddingBottom: 10 }}>
                <Text style={Styles.title}>{car.brand}</Text>
                <Text style={Styles.model}>{car.model}</Text>
              </View>

              <Text style={Styles.text}>Color: {car.color.toUpperCase()}</Text>
              <Text style={Styles.text}>Seats: {car.size}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={Styles.price}>
                ${car.price.toLocaleString("en", { minimumFractionDigits: 0 })}
              </Text>
            </View>
            
          </View>
          <View style={Styles.arrowBox}>
               <Image style={Styles.arrow} source={require("../pics/forward.png")} />
          </View>
        </View>
        </TouchableHighlight>
    );
  }
}

const Styles = StyleSheet.create({
  touchable: {
    flex: 1,
    paddingBottom: 7,
  },
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    flex: 1,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3
  },
  image: {
    flex: 6,
    width: 30,
    height: 180
  },
  view: {
    paddingLeft: 7,
    flex: 5
  },
  title: {
    fontSize: 15
    // color: "dodgerblue",
    // fontWeight: "bold",
  },
  model: {
    fontSize: 20,
    fontWeight: "bold"
    // color: "#4d0000",
  },
  text: {
    fontSize: 14
  },
  price: {
    fontSize: 20,
    fontWeight: "bold"
  }, arrowBox:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  arrow:{
    height:30,
    width:30,
    opacity: .3,
  }
});
