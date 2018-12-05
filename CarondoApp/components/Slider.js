import React from 'react'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default function Slider (props) {
    
    const Styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            // paddingBottom: 30,
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
    })
        return (
            <View style={Styles.container}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ flex: 1 }}>{props.values[0].toLocaleString("en", { minimumFractionDigits: 0 }) + props.unit}</Text>
                        <Text style={{ textAlign: 'right', flex: 1 }}>{props.values[1].toLocaleString("en", { minimumFractionDigits: 0 }) + props.unit}</Text>
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
        )
    
}