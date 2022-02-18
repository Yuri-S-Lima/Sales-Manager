import React ,{ useState } from "react";
import { View, SafeAreaView, Text } from 'react-native';
import { ButtonOne } from "../components/ButtonOne";
import { Styles } from "../components/Styles";
import { TypeText } from "../components/TypeText";

export function Escolha({navigation}){

    function AddCliente(){
        navigation.navigate('AddCliente');
    }

    function AddProduto(){
        navigation.navigate('BuscarCliente');
    }

    function voltar(){
        navigation.navigate('Home');
    }

    return(
        <View style = {{flex: 1}}>
            <SafeAreaView style = {{flex:1, marginHorizontal: 25, marginVertical: 50}}>
                <View>
                    <TypeText textTitle = 'Adicionar Venda' onPress = {voltar} />
                </View>
            
                <View style = {{flex:1, justifyContent:'center'}}>
                    <Text style = {[Styles.text4, {textAlign:'center'}]}>Venda para</Text>

                    <View style = {{marginVertical: 56}} >
                        <ButtonOne title = 'Novo Cliente' onPress = {AddCliente}/>
                        <ButtonOne title = 'Cliente Existente' onPress = {AddProduto} />
                    </View>
                </View>

            </SafeAreaView>
        </View>
    );
}