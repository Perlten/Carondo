import React from "react";
import { StyleSheet, Text, View, TouchableHighlight, ScrollView } from "react-native";
import Facade from "../facade";
import CarResult from "../components/CarResult";

export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null
    }
  }
  async componentDidMount(){
    const nav = this.props.navigation;
    const min_seats = nav.getParam("seats")[0];
    const max_seats = nav.getParam("seats")[1];
    const colors = nav.getParam("colors");
    const min_price = nav.getParam("price")[0];
    const max_price = nav.getParam("price")[1];
    const eco = nav.getParam("eco");
    

    const results = await Facade.fetchCars(min_seats, max_seats, colors, min_price, max_price, eco)
    
    this.setState({results})
  }

  render() {


    if(this.state.results){
      console.log(this.state.results)
      const sortedList = this.state.results.sort((a,b)=>{
        return a.price - b.price  
      })
      const list = sortedList.map((car, index) => 
        <CarResult car={car} key={index} navigate={this.props.navigation}/>
      )

      return (
      <View style={{backgroundColor: "lightgrey"}}>
        <ScrollView>
        {list}
        </ScrollView>
      </View>
      );
    }
    return (
      <View>
        <Text>Loading!</Text>
      </View>
      );
    
  }
}
