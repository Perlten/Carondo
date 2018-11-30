import React, { createContext } from "react";
import {Image, StyleSheet} from 'react-native'
import NB, { Container, Header, Button, Fab } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
                
                <Icon name="youtube-searched-for"/>
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