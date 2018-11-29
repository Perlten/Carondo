import React from "react";
import {Dimensions, StyleSheet, Text, View, TouchableHighlight, ScrollView , Image} from "react-native";
import MyNav from '../components/MyNav'
import { Button } from 'react-native-elements'

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
            <>
            <View style={{flex:5.5}}>
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
            </View>
            

            {/* <View style={Styles.container}>
                <TouchableHighlight style={Styles.button} >
                    <Text style={Styles.buttonText}>
                        Go to site
                    </Text>
                </TouchableHighlight>
            </View> */}

            <View style={Styles.container2}>
                            <View style={Styles.container3}>
                                <Button
                                    raised
                                    large
                                    onPress={() => this.props.navigation.navigate("WebView", {url: car.purchaseURL})}
                                    backgroundColor="green"
                                    // icon={{name: ''}}
                                    title='Go To Site' />
                            </View>
                           
                        </View>
            <MyNav {...this.props}/>
            </>

            

        );
    }
}

const win = Dimensions.get("window")

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {

        width: 260,
        alignItems: 'center',
        borderColor: "black",
        margin: 10,
        backgroundColor: 'green',
    },buttonText: {
        padding: 20,
        fontSize: 24,
        color: 'white'
    },
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
    container2: {
        justifyContent: 'flex-end',
    },
    container3: {
        alignSelf: 'center',
        paddingBottom: 25,
    },
})

