import { View, Text} from 'react-native';
import { Styles } from "./Styles";

export function ClientesSimples(props){

    return (
        <View style = {Styles.simpleForm}>

            <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style = {Styles.text7}>{props.Nome}</Text>
                <Text  style = {Styles.text7}>{`R$ ${props.Divida}`}</Text>
            </View>

        </View>
    );
}

{/* <Text style = {[Styles.text5, {color:'white'}]}>{`R$ ${props.Divida},00`}</Text> */}