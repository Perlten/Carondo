import React from 'react'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Styles from './../styles/Styles';

export default function Slider (props) {
    
        return (
            <View style={Styles.container}>
                <Text style={{ fontSize: 25 }}>{props.label}</Text>
                <View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ flex: 1 }}>{props.values[0] + props.unit}</Text>
                        <Text style={{ textAlign: 'right', flex: 1 }}>{props.values[1] + props.unit}</Text>
                    </View>

                    <MultiSlider
                        values={[props.values[0], props.values[1]]}
                        sliderLength={280}
                        onValuesChange={props.onChange}
                        min={props.min}
                        max={props.max}
                        step={props.step}

                    />
                </View>
            </View>
        )
    
}