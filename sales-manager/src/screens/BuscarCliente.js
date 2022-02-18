import React ,{ useState, useContext, useEffect } from "react";
import { View, SafeAreaView, TouchableOpacity, Text, FlatList } from 'react-native';
import { InputBusca } from "../components/InputBusca";
import { Styles } from "../components/Styles";
import { TypeText } from "../components/TypeText";
import { AuthContext } from "../context/AuthContext";
import { db } from "../util/Firebase";
import { ClientesSimples } from "../components/ClientesSimples";
import { useIsFocused } from "@react-navigation/native";

export function BuscarCliente({navigation}){

    const [buscado, setBusca] = useState('');
    const [id, setId] = useState('');
    const [Divida, setDivida] = useState(null);
    const [Lucro, setLucro] = useState(null);
    const [ClientesLista, setClientesLista] = useState(null);
    const isFocused = useIsFocused();

    const { user } = useContext(AuthContext);

    useEffect(() => {
        
        async function loadClientes() {
            await db.collection('Usuários').doc(user.uid).collection('Clientes').get().then((query) => {
                let nomes = []; 
                query.docs.forEach((doc) => {
                    nomes.push({...doc.data()});
                });
                setClientesLista(nomes);
                
                db.collection('Usuários').doc(user.uid).get().then((doc) => {
                    setLucro(doc.data().Lucro);       
                });

            });
        }
        loadClientes();
       
    }, [isFocused]);

    function busca(nome, div){
        let nomes = [];
        let ids = []
        async function loadClientes() {
            await db.collection('Usuários').doc(user.uid).collection('Clientes').get().then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    nomes.push(doc.data().Nome);
                    ids.push(doc.id);
                },
                
                );

                let pos = nomes.indexOf(nome);

                for(var i = 0; i < ids.length; i++){
                    if(i === pos){
                        let id = ids[i];
                        setId(id);  
                        setDivida(div);
                        navigation.navigate('AddProduto', {verifica: false, buscado: id, div: div, lucro: Lucro});
                    }
                }
                
            });
    
        }

        loadClientes();
    }

    function voltar(){
        navigation.navigate('Escolha');
    }

    return(
        <View style = {{flex: 1}}>
            <SafeAreaView style = {{flex:1, marginHorizontal: 25, marginVertical: 50}}>
                <View>
                    <View >
                        <TypeText textTitle = 'Buscar Cliente' onPress = {voltar}/>
                    </View>
                
                    <View style = {{marginTop:50,justifyContent:'center'}}>
                        <InputBusca buscaTitulo = 'Buscar Cliente'  onChangeText = {setBusca}  />
                        
                    </View>    
  
                </View>
                
                <View style = {{ marginVertical: 25}}>
                    { ClientesLista != null?
                        <FlatList
                            
                            keyExtractor={(item) => item.Nome}
                            data={ClientesLista.filter(n => n.Nome.includes(buscado))}

                            renderItem={({ item }) => 
                                <TouchableOpacity onPress={() => busca(item.Nome, item.Divida)}>    
                                    <ClientesSimples Nome = {item.Nome} Divida = {item.Divida}/> 
                                </TouchableOpacity>     
                            }

                        />:<Text style = {Styles.textSocial}>CARREGANDO....</Text>
                    }

                </View>
            </SafeAreaView>
        </View>
    );
}