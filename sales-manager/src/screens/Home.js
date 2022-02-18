import React ,{ useState, useContext, useEffect } from "react";
import { View, Text, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Styles } from "../components/Styles";
import {FormData} from "../components/FormData";
import { db } from "../util/Firebase";
import { AuthContext } from "../context/AuthContext";
import { ClientesSimples } from "../components/ClientesSimples";
import { useIsFocused } from "@react-navigation/native";

function Home({navigation}){

    const { user } = useContext(AuthContext);
    const [Nome, setUsuario] = useState(null);
    const [ClientesLista, setClientesLista] = useState(null);
    const [Lucro, setLucro] = useState(null);
    const isFocused = useIsFocused();
  
    function screenAdd(){
        navigation.navigate('Escolha');
    }

    function screenPag(){
        navigation.navigate("Pagamento");
    }

    function consultar(){
        navigation.navigate("Consulta");
    }

    function config(){
        navigation.navigate("Config",{usuario: Nome, Lucro: Lucro, Clientes: ClientesLista});
    }

    function dados(){
        navigation.navigate("Data", {Lucro: Lucro, Clientes: ClientesLista, Nome: Nome});
    }

    function editarUsuario(){
        navigation.navigate("EditarUsuario", {NomeUsuario: Nome});
    }

    useEffect(() => {
        
        async function loadClientes() {
            await db.collection('Usuários').doc(user.uid).collection('Clientes').get().then((query) => {
                let nomes = []; 
                query.docs.forEach((doc) => {
                    nomes.push({...doc.data()});
                });
                setClientesLista(nomes);
                
                db.collection('Usuários').doc(user.uid).get().then((doc) => {
                    setUsuario(doc.data().NomeUsuario);
                    setLucro(doc.data().Lucro);       
                });

            });
        }
        loadClientes();
       
    }, [isFocused]);


    return(
        <View style = {{flex:1}}>
            <SafeAreaView style = {{flex:1, marginHorizontal: 25, marginVertical: 50}}>
                <View>
                    <View style = {{flexDirection: "row", justifyContent:'space-between', alignItems:'center'}} >
                        {(Nome != null)?
                            <Text style = {Styles.text2}>{Nome}</Text> :
                            <Text style = {Styles.text2}>CARREGANDO...</Text>
                        }
                        <TouchableOpacity onPress={editarUsuario}>
                            <Image source = {require('../../assets/icons/PerfilTwo.png')} style={{ width: 40, height: 40 }} />
                        </TouchableOpacity>
                    </View>
                    
                    <View >                     
                        <FormData text = 'Vendas' value = {Lucro} />                  
                    </View>
                </View>

                <View style = {{flex:1, marginVertical: 35}}>
                    <View style = {{flexDirection: 'row', justifyContent:'space-between'}}>
                        <TouchableOpacity onPress={screenAdd}>
                            <View style={{ alignItems: 'center' }}>
                                <Image source = {require('../../assets/icons/add.png')} style={{ width: 50, height: 50 }} />
                                <Text style = {{ width: 100, textAlign: 'center', color: '#734D8C' }}>Adicionar Venda</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={screenPag}>
                            <View style={{ alignItems: 'center' }}>
                                <Image source = {require('../../assets/icons/pagamento.png')} style={{ width: 50, height: 50 }} />
                                <Text style = {{ width: 100, textAlign: 'center', color: '#734D8C' }}>Adicionar Pagamento</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={consultar}>
                            <View style={{ alignItems: 'center' }}>
                                <Image source = { require('../../assets/icons/clientes.png')} style={{ width: 50, height: 50 }} />
                                <Text style = {{ width: 100, textAlign: 'center', color: '#734D8C' }}>Consultar Clientes</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style = {{ marginVertical: 25}}>
                        <Text style = {Styles.text3}>Clientes</Text>

                        { ClientesLista != null?
                            <FlatList
                                
                                keyExtractor={(item) => item.Nome}
                                data={ClientesLista}

                                renderItem={({ item }) => 
                                                      
                                    <ClientesSimples Nome = {item.Nome} Divida = {item.Divida}/>     
                                }

                            />:<Text style = {Styles.textSocial}>CARREGANDO....</Text>
                        }

                        {(ClientesLista == '')?
                            <Text style = {Styles.textSocial}>Lista Vazia</Text>:<></>
                        }

                    </View>
                    
                </View>

                <View style = {Styles.formEnd}>
                    <TouchableOpacity>
                        <Image source = { require('../../assets/icons/HomeB.png')} style={{ width: 24, height: 24 }} />               
                    </TouchableOpacity>

                    <TouchableOpacity onPress={dados} >
                        <Image source = { require('../../assets/icons/dados.png')} style={{ width: 24, height: 24 }} />      
                    </TouchableOpacity>

                    <TouchableOpacity onPress={config}>    
                        <Image source = { require('../../assets/icons/Conf.png')} style={{ width: 24, height: 24 }} /> 
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </View>
    );
} 

export default Home;