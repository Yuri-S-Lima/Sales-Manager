import { Image, View, Text} from 'react-native';
import { Styles } from "./Styles";

export function FormData(props){

    return (
        <View style = {Styles.form}>
            <View>
                <Text style = {Styles.textDisplay}>{props.text}</Text>
                {(props.value != null)?
                    <Text style = {Styles.textDisplay2}>{`R$ ${props.value}`}</Text> :
                    <Text style = {Styles.textDisplay2}>CARREGANDO...</Text>
                }
                
            </View>
            <Image source={require('../../assets/icons/wallet.png')} style={{ width: 38, height: 32 }} />
        </View>
    );
}