import { Image, View, Text} from 'react-native';
import { Styles } from "./Styles";

export function FormVendas(props){
    return(
        <View>
            <View style={Styles.textVendas}>
                <View>
                    <Text style = {Styles.text3}>{props.cliente}</Text>
                    <Text style = {{ color: '#734D8C' }}>{props.compra}</Text>
                </View>
                <Text style = {Styles.text3}>{props.preco}</Text>
            </View>
        </View>
    );
}