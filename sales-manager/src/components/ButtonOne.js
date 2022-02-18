import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Styles } from './Styles';

export function ButtonOne(props){
    return (
        <View >
            <TouchableOpacity style = {Styles.button} onPress={() => { if (props.onPress) props.onPress();}}>       
                <Text style = {Styles.textButton}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    );
}