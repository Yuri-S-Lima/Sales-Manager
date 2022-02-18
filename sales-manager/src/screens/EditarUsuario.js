import React ,{ useState, useContext, useEffect } from "react";
import { View, SafeAreaView, Text } from 'react-native';
import { ButtonOne } from "../components/ButtonOne";
import { FormInput } from "../components/FormInput";
import { TypeText } from "../components/TypeText";
import { db } from "../util/Firebase";
import { AuthContext } from "../context/AuthContext";

export function EditarUsuario({navigation, route}){

    const { user } = useContext(AuthContext);
    const [Nome, setNome] = useState('');
    const [msg, setMsg] = useState(null);
    
    function editaUsuario(){

        if ((Nome == '')) {
            setMsg('Nome inválido');
            return;
        }

        db.collection("Usuários").doc(user.uid).update({
            NomeUsuario: Nome,
        });

        navigation.navigate('Home');
    }

    function voltar(){
        navigation.navigate('Home');
    }

    useEffect(() => {
        setNome(route.params.NomeUsuario);
    },[]);
    
    return(
        <View style = {{flex: 1}}>
            <SafeAreaView style = {{flex:1, marginHorizontal: 25, marginVertical: 50}}>

                    <View style = {{flex:1, justifyContent:'space-between'}}>

                        <TypeText textTitle = 'Editar Usuário' onPress = {voltar}/>

                        <View>

                            <Text style={{ textAlign: 'center', color: '#6D3F8C' }}>{msg}</Text>
                            <View style = {{marginTop: 20}}>
                                <FormInput holder = {'Nome de usuário'} image = {false} value = {Nome} onChangeText = {text => setNome(text)} />
                            </View>          

                        </View>

                        <View style = {{marginTop: 37, alignItems:'center'}}>
                            <ButtonOne title = 'Salvar' onPress = {editaUsuario}/>
                        </View>
                        
                    </View>
                
            </SafeAreaView>
        </View>
    );
}