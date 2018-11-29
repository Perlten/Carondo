import React from "react";
import { Image, StyleSheet, Text, View, TouchableHighlight, ScrollView } from "react-native";

export default class CarResult extends React.Component{
    constructor(props){
        super(props)
    }


carTouched = () =>{

    
    this.props.navigate.navigate("CarView", {car: this.props.car})

}

    render(){
        const car = this.props.car
       
        return(
            <TouchableHighlight style={Styles.touchable} onPress={this.carTouched}>
                <View style={Styles.container}>
                    <Image style={Styles.image} source={{uri: car.imageURL}}/>
                    <View style={Styles.view}>
                    <View style={{flex:9}}>
                        <Text style={Styles.title}>{car.brand + " " + car.model}</Text>
                        <Text style={Styles.text}>Color: {car.color.toUpperCase()}</Text>
                        <Text style={Styles.text}>Seats: {car.size}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={Styles.price}>

                        </Text>

                    </View>
                        

                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}


const Styles = StyleSheet.create({
    touchable:{
        flex:1,
        paddingBottom: 7,
    },
    container:{
        backgroundColor:"white",
        flexDirection: "row",
        flex: 1,
        
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 3,

        
        
    },
    image: {
        flex:1,
        width: 30,
        height: 180

    },
    view: {
        paddingLeft: 7,
        flex: 1,
    },
    title:{
        fontSize: 20,
        fontWeight: "bold",

    },
    text:{
        fontSize: 14,
        
    },
    price:{
        fontSize: 20,
        fontWeight: "bold",

    },
    
})