import React, { createContext } from "react";
import { StyleSheet,Image, Text, View, TouchableHighlight, ScrollView, Dimensions } from "react-native";
import Facade from "../facade";
import CarResult from "../components/CarResult";

export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      error: null
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
    
    try{
    const results = await Facade.fetchCars(min_seats, max_seats, colors, min_price, max_price, eco)
    this.setState({results})  
  }catch(e){
    console.log("ERROR!!!!: " + JSON.stringify(e))
    if(e.fullError){
      this.setState({error: e.fullError})
    } else{
      const error = {
        errorTitle: "Could not connect!",
        errorMessage: "Please try again again later.",
        
      }
      this.setState({error})
    }

    }

    
  }

  render() {

    if(this.state.error){
      return(
      <View>
        <Text>{this.state.error.errorTitle}</Text>
        <Text>{this.state.error.errorMessage}</Text>
      </View>
);
    }


    if(this.state.results){
      console.log(this.state.results)
      const sortedList = this.state.results.sort((a,b)=>{
        return a.price - b.price  
      })
      const list = sortedList.map((car, index) => 
        <CarResult car={car} key={index} navigate={this.props.navigation}/>
      )

      return (
      <View style={{backgroundColor: "#f1f1f1"}}>
        <ScrollView>
        {list}
        </ScrollView>
      </View>
      );
    }
    return (
      <>
      <View style={Styles.container}>
      <Image style={Styles.image} source={require('../pics/loading.gif')}/>

      </View>
      </>
      );
    
  }
}
const win = Dimensions.get("window")

const Styles = StyleSheet.create({
  container: {
    flex:1,
    // width: 30,
    
      alignItems: 'center',
      justifyContent: 'center',
  },
  image:{
    // width: 100,
    // height: 250
  }
});
