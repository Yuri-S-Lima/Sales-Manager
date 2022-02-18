import React ,{ useContext ,useState } from "react";
import { View, SafeAreaView, Text } from 'react-native';
import { ButtonOne } from "../components/ButtonOne";
import { FormInput } from "../components/FormInput";
import { TypeText } from "../components/TypeText";
import { db } from "../util/Firebase";
import { AuthContext } from "../context/AuthContext";

export function AddCliente({navigation}){

    const [Nome, setNome] = useState('');
    const [Bairro, setBairro] = useState('');
    const [Rua, setRua] = useState('');
    const [Telefone, setTelefone] = useState('');
    const [N, setN] = useState(''); 
    const [msg, setMsg] = useState(null);

    const { user } = useContext(AuthContext);
    let collectionName = 'Clientes';

    function adicionaCliente(){

        if ((Nome == '')) {
            setMsg('Nome inválido');
            return;
        }

        if ((Bairro == '')) {
            setMsg('Bairro inválido');
            return;
        }

        if ((Rua == '')) {
            setMsg('Rua inválida');
            return;
        }

        if ((Telefone == '')) {
            setMsg('Telefone inválido');
            return;
        }

        if ((N == '')) {
            setMsg('Número inválido');
            return;
        }

        db.collection("Usuários").doc(user.uid).collection(collectionName).add({
            Nome: Nome,
            Bairro: Bairro,
            Rua: Rua,
            Telefone: Telefone,
            Numero: N, 
            Divida: 0,
        });

        navigation.navigate('AddProduto', {verifica: true, buscado: Nome});
    }

    function voltar(){
        navigation.navigate('Escolha');
    }

    return(
        <View style = {{flex: 1}}>
            <SafeAreaView style = {{flex:1, marginHorizontal: 25, marginVertical: 50}}>

                <View style = {{flex:1, justifyContent:'space-between'}}>

                    <TypeText textTitle = 'Adicionar Cliente' onPress = {voltar}/>

                    <View>
                        
                        <Text style={{ textAlign: 'center', color: '#6D3F8C' }}>{msg}</Text>
                        <View style = {{marginTop: 20}}>
                            <FormInput holder = 'Nome do Cliente' image = {false} onChangeText = {text => setNome(text)} />
                        </View>

                        <View style = {{marginTop: 20}}>
                            <FormInput holder = 'Bairro' image = {false} onChangeText = {text => setBairro(text)}/>
                        </View>

                        <View style = {{marginTop: 20}}>
                            <FormInput holder = 'Rua' image = {false} onChangeText = {text => setRua(text)}/>
                        </View>

                        <View style = {{marginTop: 20}}>
                            <FormInput holder = 'Telefone' image = {false} n = {true} onChangeText = {text => setTelefone(text)}/>
                        </View>

                        <View style = {{marginTop: 20}}>
                            <FormInput holder = 'N°' n = {true} image = {false} onChangeText = {text => setN(text)}/>
                        </View>           

                    </View>

                    <View style = {{marginTop: 37, alignItems:'center'}}>
                        <ButtonOne title = 'Prosseguir' onPress = {adicionaCliente}/>
                    </View>

                </View>
            </SafeAreaView>
        </View>
    );
}