import React ,{ useState } from "react";
import { View, Text, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Styles } from "../components/Styles";
import {FormData} from "../components/FormData";
import { ClientesSimples } from "../components/ClientesSimples";

export function Data({navigation, route}){

    function config(){
        navigation.navigate("Config",{usuario: route.params.Nome, Lucro: route.params.Lucro, Clientes: route.params.Clientes});
    }

    function Home(){
       
        navigation.navigate("Home");
        
    }

    return (
        <View style = {{flex:1}}>
            <SafeAreaView style = {{flex:1, marginHorizontal: 25, marginVertical: 50}}>

                 <View>
                    <View style = {{justifyContent:'space-between', alignItems:'flex-start'}} >
                        <Text style = {Styles.text2}>Detalhes</Text>
                        {/* <View style = {{flexDirection: 'row', marginLeft:'auto',alignItems: 'center', marginVertical: 36}}>
                            <Text style = {{fontSize: 12, color: '#734D8C', marginHorizontal:5}}>out-dez</Text>
                            <Image source = {require('../../assets/icons/arrow.png')} style={{ width: 12, height: 12}} />
                        </View> */}
                    </View>
                    
                    <View >                     
                        <FormData text = 'Total em Vendas' value = {route.params.Lucro} />                  
                    </View>
                </View>

                <View style = {{flex:1, marginVertical: 25}}>

                        { route.params.Clientes != null?
                            <FlatList
                                
                                keyExtractor={(item) => item.Nome}
                                data={route.params.Clientes}

                                renderItem={({ item }) => 
                                                      
                                    <ClientesSimples Nome = {item.Nome} Divida = {item.Divida}/>     
                                }

                            />:<Text style = {Styles.textSocial}>CARREGANDO....</Text>
                        }

                </View>  

                <View style = {[Styles.formEnd]}>
                    <TouchableOpacity onPress={Home}>
                        <Image source = { require('../../assets/icons/home.png')} style={{ width: 24, height: 24 }} />               
                    </TouchableOpacity>

                    <TouchableOpacity >
                        <Image source = { require('../../assets/icons/dadosB.png')} style={{ width: 24, height: 24 }} />      
                    </TouchableOpacity>

                    <TouchableOpacity onPress={config}>    
                        <Image source = { require('../../assets/icons/Conf.png')} style={{ width: 24, height: 24 }} /> 
                    </TouchableOpacity>
                </View>

              {/*   <FormEnd dados = {true}/> */}
            </SafeAreaView>
        </View>
    );
}