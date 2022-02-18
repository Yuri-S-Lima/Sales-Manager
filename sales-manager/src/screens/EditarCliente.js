import React ,{ useState, useContext, useEffect } from "react";
import { View, SafeAreaView, Text } from 'react-native';
import { ButtonOne } from "../components/ButtonOne";
import { FormInput } from "../components/FormInput";
import { Styles } from "../components/Styles";
import { TypeText } from "../components/TypeText";
import { db } from "../util/Firebase";
import { AuthContext } from "../context/AuthContext";

export function EditarCliente({navigation, route}){

    const [cliente, setCliente] = useState(null);
    const { user } = useContext(AuthContext);
    const [Nome, setNome] = useState('');
    const [Bairro, setBairro] = useState('');
    const [Rua, setRua] = useState('');
    const [Telefone, setTelefone] = useState('');
    const [N, setN] = useState('');
    const [msg, setMsg] = useState(null);
    
    function editaCliente(){

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

        db.collection("Usuários").doc(user.uid).collection("Clientes").doc(route.params.Id).update({
            Nome: Nome,
            Bairro: Bairro,
            Rua: Rua,
            Telefone: Telefone,
            Numero: N, 
        });

        navigation.navigate('ClienteData', {Nome: Nome, id: route.params.Id, Divida: route.params.div});
    }

    useEffect(() => {
        let nomes = [];        
        
        async function loadProds() {
            await db.collection('Usuários').doc(user.uid).collection('Clientes').get().then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    nomes.push(doc.data());
                });

                var dados = nomes.filter(nome => (nome.Nome) === route.params.Nome);               
            
                dados.forEach(cliente => { 
                    setCliente(cliente)

                    setBairro(cliente.Bairro);
                    setN(cliente.Numero);
                    setNome(cliente.Nome);
                    setRua(cliente.Rua);
                    setTelefone(cliente.Telefone);
                })

            });
           
        }
        loadProds();
    }, [])

    function voltar(){
        navigation.navigate('ClienteData', {Nome: Nome, id: route.params.Id, Divida: route.params.div});
    }

    return(
        <View style = {{flex: 1}}>
            <SafeAreaView style = {{flex:1, marginHorizontal: 25, marginVertical: 50}}>
                
                {(cliente != null)?
                    <View style = {{flex:1, justifyContent:'space-between'}}>

                        <TypeText textTitle = 'Editar Cliente' onPress={voltar}/>

                        <View>

                            <Text style={{ textAlign: 'center', color: '#6D3F8C' }}>{msg}</Text>
                            <View style = {{marginTop: 20}}>
                                <FormInput holder = {'Nome'} image = {false} value = {Nome} onChangeText = {text => setNome(text)} />
                            </View>

                            <View style = {{marginTop: 20}}>
                                <FormInput holder = {'Bairro'} image = {false} value = {Bairro} onChangeText = {text => setBairro(text)} />
                            </View>

                            <View style = {{marginTop: 20}}>
                                <FormInput holder = {'Rua'} image = {false} value = {Rua} onChangeText = {text => setRua(text)} />
                            </View>

                            <View style = {{marginTop: 20}}>
                                <FormInput holder = {'Telefone'} image = {false} value = {Telefone} n = {true} onChangeText = {text => setTelefone(text)} />
                            </View>

                            <View style = {{marginTop: 20}}>
                                <FormInput holder = {'Numero'} image = {false} value = {N} n = {true} onChangeText = {text => setN(text)} />
                            </View>           

                        </View>

                        <View style = {{marginTop: 37, alignItems:'center'}}>
                                <ButtonOne title = 'Salvar' onPress = {editaCliente}/>
                        </View>
                        
                    </View>

                    : <Text style = {Styles.textSocial}>CARREGANDO....</Text>
                }
                
            </SafeAreaView>
        </View>
    );
}