import React, {useState} from "react";
import { Image, View, Text, TouchableOpacity } from 'react-native';


export function Abertura(){
    return(
        <View style = {{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Image source={require('../../assets/icons/logo.png')}/>
        </View>
    );
}