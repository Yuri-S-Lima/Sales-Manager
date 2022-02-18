import { Image, View, Text} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Styles } from "./Styles";

export function FormCard(props){

    return (
        <View style = {Styles.Card}>
            
          
            <View style = {{flexDirection:'row', justifyContent:"space-between", alignItems:"center", marginVertical:8}}>
                <Text style = {[Styles.text5, {color:'white'}]}>{props.nome}</Text>
                <TouchableOpacity onPress={() => { if (props.onPress) props.onPress();}}>
                    <Image source={require('../../assets/icons/deleteB.png')} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>
            </View>

            <View style = {{marginVertical: 12}}>
                <Text style = {Styles.text6}>{props.Telefone}</Text>
                <Text style = {Styles.text6}>{props.Rua}</Text>
                <Text style = {Styles.text6}>{props.Bairro}</Text>
                <Text style = {Styles.text6}>{props.Numero}</Text>
            </View>

            <View style = {{flexDirection:'row', justifyContent:"space-between", alignItems:"center", marginVertical: 8}}>
                <Text style = {[Styles.text5, {color:'white'}]}>Saldo Devedor</Text>
                <Text style = {[Styles.text5, {color:'white'}]}>{`R$ ${props.Divida}`}</Text>
            </View>
          

        </View>
    );
}