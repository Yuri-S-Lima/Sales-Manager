import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Styles } from "./Styles";

export function SocialLogin(props){
    return(
        <View style = {props.style}>

            {props.social == 'Google'?
                (<TouchableOpacity style = {[Styles.socialLogin, {backgroundColor: '#ffffff'}]}>
                    <Image source={require('../../assets/icons/google.png')}/>
                    <Text style = {[Styles.textSocial]}>{props.social}</Text>
                    </TouchableOpacity>
                ):
                
                (<TouchableOpacity style = {[Styles.socialLogin, {backgroundColor: '#ffffff'}]}>
                    <Image source={require('../../assets/icons/facebook-icon.png')}/>
                    <Text style = {Styles.textSocial}>{props.social}</Text>
                    </TouchableOpacity>
                )
            }
            
        </View>
    );
}