import React, { createContext } from "react";
import { StyleSheet,Image, Text, View, TouchableHighlight, ScrollView, Dimensions } from "react-native";
import Facade from "../facade";
import CarResult from "../components/CarResult";
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'
import MyNav from '../components/MyNav'

import {Fab, Button} from 'native-base'

import Icon from 'react-native-vector-icons/MaterialIcons';
import IconA from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/dist/FontAwesome'


export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      error: null,
      show: true,
      active: false,
      dollar: true,
      brand: null,
      seats: null,
   

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

  toggleDollar = () =>{

    this.setState({dollar: !this.state.dollar})

  }

  toggleBrand = () => {
    const stateType = this.state.brand
      if(stateType == null){
        this.setState({brand: true})
      }else if(stateType == true){
        this.setState({brand: false})
      }else{
        this.setState({brand: null})
      }
    }

    toggleSeats = () => {
      const stateType = this.state.seats
        if(stateType == null){
          this.setState({seats: true})
        }else if(stateType == true){
          this.setState({seats: false})
        }else{
          this.setState({seats: null})
        }
      }
    
  

  getArrow = (type) => {
    const stateType = this.state[type]
    if(stateType != null){
      return stateType ? <Icon name="keyboard-arrow-down" style={{color:"white"}}/> 
    :  <Icon name="keyboard-arrow-up" style={{color:"white"}}/>
    }
    
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
     var sortedList = this.state.results;
      
     if(this.state.dollar){
      sortedList = sortedList.sort((a,b)=>{
        return a.price - b.price  
      })  
    }else{
      sortedList = sortedList.sort((a,b)=>{
        return b.price - a.price
      })  
    }

    if(this.state.seats == true){
      sortedList = sortedList.sort((a,b)=>{
        return a.size - b.size 
      })  
    } else if(this.state.seats == false){
      sortedList = sortedList.sort((a,b)=>{
        return b.size - a.size 
      })  
    }
    
    if(this.state.brand == true){
      sortedList = sortedList.sort((a,b) => {
        return ('' + a.brand).localeCompare(b.brand)
      })
    } else if(this.state.brand == false) {
      sortedList = sortedList.sort((a,b) => {
        return b.brand.localeCompare(a.brand)
      })
    }

    

      const list = sortedList.map((car, index) => 
        <CarResult car={car} key={index} navigate={this.props.navigation}/>
      )

      return (
      <View style={{backgroundColor: "#f1f1f1", flex: 1}}>

        <ScrollView>
        {list}
        </ScrollView>
        <MyNav {...this.props}/>
       
              <Fab
            active={this.state.active}
            direction="down"
            containerStyle={{ }}
            style={{ backgroundColor: '#3d3c3c' }}
            position="topRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="sort"/>
            <Button
             style={{ backgroundColor: '#377d22' }}
             onPress={this.toggleDollar}
             >
              <IconA name="dollar" style={{color:"white"}}/>
              {this.getArrow("dollar")}
              
            </Button>
            <Button
             style={{ backgroundColor: 'red' }}
             onPress={this.toggleSeats}
             >
              <Icon name="event-seat" style={{color:"white"}}/>
              {this.getArrow("seats")}
              
            </Button>
            <Button
             style={{ backgroundColor: 'darkblue' }}
             onPress={this.toggleBrand}
             >
              <IconA name="car" style={{color:"white"}}/>
              {this.getArrow("brand")}
              
            </Button>
            
            
          
          </Fab>
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
