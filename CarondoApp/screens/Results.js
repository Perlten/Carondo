import React, { createContext } from "react";
import { StyleSheet,Image, Text, View, TouchableHighlight, ScrollView, Dimensions } from "react-native";
import Facade from "../facade";
import CarResult from "../components/CarResult";
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'
import MyNav from '../components/MyNav'


export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      error: null,
      show: true,
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

    this.setState({show: true})
  }

  handleOpen = () => {
    this.setState({ show: true })
  }

  handleClose = () => {
    this.setState({ show: false })
    this.props.navigation.navigate("Search")
  }

  render() {
    const error = this.state.error
    if(error){
      return(
        <View>
          <SCLAlert
            theme="warning"
            onRequestClose={this.handleClose}
            show={this.state.show}
            title={error.errorTitle}
            subtitle={error.errorMessage}
          >
            <SCLAlertButton theme="warning" onPress={this.handleClose}> Go Back </SCLAlertButton>
          </SCLAlert>
        </View>
      )

      
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
      <View style={{backgroundColor: "#f1f1f1", flex: 1}}>

        <ScrollView>
        {list}
        </ScrollView>
        <MyNav {...this.props}/>

      </View>
      );
    }
    return (
      <>
      <View style={Styles.container}>
      <Image  source={require('../pics/loading.gif')}/>
      <MyNav {...this.props}/>
      </View>
      </>
      );
    
  }
}
const win = Dimensions.get("window")

const Styles = StyleSheet.create({
  alertContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex:1,
    // width: 30,
    
      alignItems: 'center',
      justifyContent: 'center',
  },
  image:{
    width: 30,
    height: 30,
  }
});
