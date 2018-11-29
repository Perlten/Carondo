import React, { createContext } from "react";
import {Image, StyleSheet} from 'react-native'
import NB, { Container, Header, Icon, Button, Fab } from 'native-base';
export default class MyNav extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Fab
                style={{ backgroundColor: 'dodgerblue' }}
                position="bottomRight"
                onPress={() => this.props.navigation.navigate("Search")}>
                
                <Image style={Styles.image} source={require("../pics/search.png")} />
              </Fab>
        )
    }
    
    
    
}
const Styles = StyleSheet.create({
    image:{
      width: 30,
      height: 30,
    },
  });