import React, {useState} from "react";
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Styles } from "./Styles";

export function InputBusca(props){
    return (
        <View style = {[Styles.inputSearch]}>
            <TextInput style = {{fontFamily:'Archivo',fontSize:16, color:'#734D8C', width:'90%'}} onChangeText={props.onChangeText} placeholder = {props.buscaTitulo} />
            {(props.image)?
                <TouchableOpacity style = {{marginLeft:'auto'}} onPress={() => { if (props.onPress) props.onPress();} }>
                    <Image source = {require('../../assets/icons/Seach.png')} style={{ width: 17, height: 17 }} /> 
                </TouchableOpacity>:<></>
            }
        </View>
    );
}