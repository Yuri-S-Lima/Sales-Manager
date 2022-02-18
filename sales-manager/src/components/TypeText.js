import { Image, View, Text, TouchableOpacity} from 'react-native';
import { Styles } from "./Styles";

export function TypeText(props){

    return (
        <View  style = {{flexDirection: 'row', alignItems:"center", justifyContent:'space-between'}}>
            <View>
                <Text style = {Styles.text2}>{props.textTitle}</Text>
            </View>
            <TouchableOpacity onPress={() => { if (props.onPress) props.onPress();} }>
                <Image source={require('../../assets/icons/voltar.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
        </View>
    );
}