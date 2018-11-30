import React from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

export default class Color extends React.Component {
    constructor(props ){

        super(props)
    }

    



    weMadeIt = () => {

        this.props.colorFlip(this.props.value)
        console.log(this.props.value)
       
    }

    render(){
        const Styles = StyleSheet.create({
            box: {
                flex: 1,
                height: 60,
                backgroundColor: this.props.colorCode,
                justifyContent:"center",
                alignItems: 'center'
            },
            pic: {
                width: 20,
                height: 20
            }
        
        })

    if (!this.props.selectedColors.includes(this.props.value)) {
        return (
            <TouchableHighlight underlayColor={"white"} style={Styles.box} onPress={this.weMadeIt}>
             <Text></Text >
            </TouchableHighlight>
        )
    } else {
        if(this.props.fileName == "black"){
        return (
            <TouchableHighlight underlayColor={"white"} style={Styles.box} onPress={this.weMadeIt} >
            <Image style={Styles.pic} source={require("../pics/black.png")}/>
            </TouchableHighlight>
        )
        }else{
            return (
                <TouchableHighlight underlayColor={"white"} style={Styles.box} onPress={this.weMadeIt} >
                <Image style={Styles.pic} source={require("../pics/white.png")}/>
                </TouchableHighlight>
            )
        }
    }
    }

    
    
}

