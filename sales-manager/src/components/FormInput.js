import React, {useState} from "react";
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Styles } from "./Styles";

export function FormInput(props){
    const [password, setPassword] = useState(props.password);

    return (
        <View>
            { (props.password)? 
                
                <View style = {[Styles.input]}>
                    <Image source={require('../../assets/icons/login.png')}/>
                    
                    <TextInput style = {Styles.textInput} onChangeText={props.onChangeText} value ={props.value} autoCapitalize='none' placeholder = {props.holder} secureTextEntry={password}  />

                    <TouchableOpacity  style = {{marginLeft:'auto'}} onPressIn={() => setPassword(false)} onPressOut={() => setPassword(true)} > 
                        <Image source={require('../../assets/icons/visibilidadeOn.png')}/>
                    </TouchableOpacity>
                </View>
                :        
                <View style = {[Styles.input]}>
                    {(props.image)?
                        (props.email)?
                            <Image source={require('../../assets/icons/email.png')}/>:
                            <Image source={require('../../assets/icons/usuário.png')}/>
                        :<></>
                    }

                    {(props.n)?
                        <TextInput style = {[Styles.textInput]} keyboardType= 'numeric' onChangeText={props.onChangeText}  value ={props.value} autoCapitalize='none' placeholder = {props.holder}/>
                        : <TextInput style = {Styles.textInput} onChangeText={props.onChangeText}  value ={props.value} autoCapitalize='none' placeholder = {props.holder}/>
                    }
                   
                </View>                    
        
            }
        </View>
    );
}