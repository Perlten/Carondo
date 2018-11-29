import React from "react";
import {Dimensions, StyleSheet, Text, View, TouchableHighlight, ScrollView , Button, Image} from "react-native";


export default class CarView extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const car = this.props.navigation.getParam("car");
        const extras = car.extra.map((e, i) =>
            <Text key={i} style={Styles.text}>{e.label}: {e.value}</Text>
        )
        return(
            <ScrollView>
                {/* <Text>{JSON.stringify(car)}</Text> */}
                <View>
                    <Image style={Styles.image} source={{uri: car.imageURL}}/>
                    <View style={Styles.centered}>
                        <Text style={Styles.title}>{car.brand}</Text>
                        <Text style={Styles.model}>{car.model}</Text>
                        <Text style={Styles.text}>Seats: {car.size}</Text>
                        <Text style={Styles.text}>Color: {car.color}</Text>
                        <Text style={Styles.price}>
                                ${car.price.toLocaleString("en", { minimumFractionDigits: 0 })}
                                
                            </Text>
                            {extras}
                    </View>
                </View>
                
            </ScrollView>

            

        );
    }
}

const win = Dimensions.get("window")

const Styles = StyleSheet.create({
    image: {
        width: win.width,
        height: 350,

    },
    title:{
        fontSize: 17,
        textAlign: "center",


    }, 
    model:{
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        // color: "#4d0000",

    },
    centered:{
        textAlign: "center"
    },
    text:{
        textAlign: "center",
        fontSize: 15,
        
    },
    price:{
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: 20,
        paddingBottom: 15,

    },
})

