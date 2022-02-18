import React ,{ useState, useEffect, useContext } from "react";
import { View, SafeAreaView, TouchableOpacity, Text, FlatList } from 'react-native';
import { InputBusca } from "../components/InputBusca";
import { Styles } from "../components/Styles";
import { TypeText } from "../components/TypeText";
import { ClientesSimples } from "../components/ClientesSimples";
import { db } from "../util/Firebase";
import { AuthContext } from "../context/AuthContext";
import { useIsFocused } from "@react-navigation/native";

export function Pagamento({navigation}){

    const [ClientesLista, setClientesLista] = useState(null);
    const { user } = useContext(AuthContext);
    const [pesquisa, setPesquisa] = useState('');
    const isFocused = useIsFocused();

    useEffect(() => {
        
        async function loadClientes() {
            await db.collection('Usuários').doc(user.uid).collection('Clientes').get().then((query) => {
                let nomes = []; 
                query.docs.forEach((doc) => {
                    nomes.push({...doc.data()});
                });

                setClientesLista(nomes);

            });
        }
        loadClientes();
       
    }, [isFocused]);

    function selecionar(nome, divida){
        let nomes = [];
        let iDs = [];
        let ide;

        db.collection('Usuários').doc(user.uid).collection('Clientes').get().then((querySnapshot) => {
                
            querySnapshot.docs.forEach((doc) => {
                nomes.push(doc.data().Nome);
                iDs.push(doc.id);
            })

            let pos = nomes.indexOf(nome);

            for(var i = 0; i < iDs.length; i++){
                
                if(i === pos){
                    ide = iDs[i];
                    console.log('id', ide)
                }
            }

            navigation.navigate("SelecionaPag", {Nome: nome, id: ide, Divida: divida})

        })   
    }

    function voltar(){
        navigation.navigate('Home');
    }

    return(
        <View style = {{flex: 1}}>
            <SafeAreaView style = {{flex:1, marginHorizontal: 25, marginVertical: 50}}>
                <View>

                    <TypeText textTitle = 'Adicionar Pagamento' onPress = {voltar}/>
                    <View style = {{marginTop:26}} ><InputBusca buscaTitulo = 'Buscar Cliente' image = {false} onChangeText = {setPesquisa}/></View>

                    <View style = {{alignItems:'center', marginTop: 26}}>
                        <Text style = {Styles.text5}>Clientes</Text>
                    </View>

                    {(ClientesLista == '')?
                            <Text style = {Styles.textSocial}>Lista Vazia</Text>:<></>
                    }

                </View>
                
              
                { ClientesLista != null?
                    <FlatList
                        
                        keyExtractor={(item) => item.Nome}
                        data={ClientesLista.filter(n => n.Nome.includes(pesquisa))}

                        renderItem={({ item }) => 
                            <TouchableOpacity onPress={() => selecionar(item.Nome, item.Divida)}>
                                <ClientesSimples Nome = {item.Nome} Divida = {item.Divida}/> 
                            </TouchableOpacity>    
                        }

                    />:<Text style = {Styles.textSocial}>CARREGANDO....</Text>
                }
              
       
            </SafeAreaView>
        </View>
    );
}