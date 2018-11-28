import React from "react";
import { StyleSheet, Text, View, TouchableHighlight, ScrollView , Button} from "react-native";


export default class CarView extends React.Component{
    constructor(props){
        super(props);
    }
    // static navigationOptions = ({ navigation }) => {
    //     const {state} = navigation;
    //     return {
    //       title: `${state.params.title}`,
    //     };
    //   };
      
    //   ChangeThisTitle = (titleText) => {
    //      const {setParams} = this.props.navigation;
    //       setParams({ title: titleText })
    //   }

      
       
    render(){
        // this.ChangeThisTitle(car.model)
        const car = this.props.navigation.getParam("car");
       


        return(
            <View>
            {/* <Text> {this.props.car.brand} </Text> */}
            <Text >{car.brand + " " + car.model}</Text>
                        <Text >Color: {car.color.toUpperCase()}</Text>
                        <Text >Seats: {car.size}</Text>
            </View>
        );
    }
}

