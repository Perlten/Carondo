import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, WebView } from "react-native";
import MyNav from '../components/MyNav'

export default class CarWebView extends React.Component{
    constructor(props){
        super(props);
    }


    render(){

        const url = "'"+this.props.url+"'"
        
        return(
            <>
        
            <WebView
            source={{uri: this.props.navigation.state.params.url}}
          />
            <MyNav {...this.props}/>

          </>
        );
    }
}