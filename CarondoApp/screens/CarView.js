import React from "react";
import {Dimensions, StyleSheet, Text, View, TouchableHighlight, ScrollView , Image} from "react-native";
import MyNav from '../components/MyNav'
import { Button } from 'react-native-elements'
import { Container, Header, Content, Card, CardItem, Body , Fab, Badge, Right, Left} from "native-base";
import Icon from 'react-native-vector-icons/Entypo';

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
            <View style={{flex:10}}>
                <ScrollView>
                    {/* <Text>{JSON.stringify(car)}</Text> */}
                    <View style={{marginBottom: 100}}>
                        <View style={Styles.centered}>
                        <Card>
                            <CardItem>
                                    <Left>
                                        <Body>

                                    <Text style={Styles.title}>{car.brand}</Text>
                                    <Text style={Styles.model}>{car.model}</Text>
                                        </Body>

                                    </Left>
                                    
                                    <Right>
                                        <Body>

                                    <Badge success>
                                    <Text style={Styles.price}>
                                            ${car.price.toLocaleString("en", { minimumFractionDigits: 0 })}
                                            
                                    </Text>
                                    </Badge>
                                        </Body>
                                    </Right>
                                    
                                
                            </CardItem>
                            <CardItem cardBody>
                            <Image style={{height: 350, width: null, flex: 1}} source={{uri: car.imageURL}}/>
                            </CardItem>
                            
                            <CardItem>
                            <Body>
                                    <Text style={Styles.text}>Seats: {car.size}</Text>
                                    <Text style={Styles.text}>Color: {car.color}</Text>
                                
                                <View style={{paddingBottom: 10}}></View>
                                
                               
                                {extras}
                            </Body>
                            </CardItem>
                        </Card>
                            
                            
                        </View>
                    </View>
                    
                </ScrollView>
            </View>
            
            
            <View style={Styles.container}>
                <TouchableHighlight 
                style={Styles.button} 
                underlayColor="#539141"
                activeOpacity={20}
                onPress={() => this.props.navigation.navigate("WebView", {url: car.purchaseURL})}
                >
                <View>
                    <Text style={Styles.buttonText}>
                    <Icon name="shop" size={25}/> Go To Shop
                    </Text>
                </View>
                   
                </TouchableHighlight>
            </View> 

            {/* <View style={Styles.container2}>

                            {/* <View >
                                <Button
                                    style={Styles.button}
                                    raised
                                    large
                                    backgroundColor="green"
                                    // icon={{name: ''}}
                                    title='Go To Site' />
                            </View> */}
                           
            {/* </View> */}

            {/* <Fab
                style={{ backgroundColor: '#377d22' }}
                position="bottomLeft"
                onPress={() => this.props.navigation.navigate("WebView", {url: car.purchaseURL})}>
                <Icon name="shop"/>
              </Fab> */}
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

        width: win.width,
        height:105,
        alignItems: 'center',
        borderColor: "black",
        // margin: 10,
        backgroundColor: '#377d22',
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
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
        // paddingTop: 20,
        // paddingBottom: 15,

    },
    container2: {
        justifyContent: 'flex-end',
        // backgroundColor: '#f1f1f1'
    },
    container3: {
        alignSelf: 'center',
        width: null,
        paddingBottom: 25,
        paddingTop:7,
    },
})

