import React ,{ useState, useContext, useEffect } from "react";
import { View, SafeAreaView, TouchableOpacity, Text, Image } from 'react-native';
import { Styles } from "../components/Styles";
import { auth } from "../util/Firebase";
import { AuthContext } from "../context/AuthContext";
import { db } from "../util/Firebase";

export function Config({navigation, route}){

    const { user } = useContext(AuthContext);
    const [nomeAtualizado, setNome] = useState('');

    useEffect(() => {
        setNome(route.params.usuario)
    }, [])

    function Sair(){
        auth.signOut().then(() => {
            navigation.navigate("LogIn");
          }).catch((error) => {
            
          });
    }

    function Home(){
       
        navigation.navigate("Home");
        
    }

    function Deletar(){
        user.delete().then(() => {
            db.collection('Usuários').doc(user.uid).delete();
            navigation.navigate("LogIn");
          }).catch((error) => {
            console.log(error);
          });
    }

    function dados(){
        navigation.navigate("Data", {Lucro: route.params.Lucro, Clientes: route.params.Clientes});
    }
    
    return(
        <View style = {{flex: 1}}>
            <SafeAreaView style = {{flex:1, marginHorizontal: 25, marginVertical: 50}}>
                
                <View style = {{flex:1, justifyContent:'center'}}>

                    <View style = {{alignItems:'center'}}> 
                        <Image source = {require('../../assets/icons/perfilOne.png')} style={{ width: 75, height: 75 }} /> 

                        <View style = {{marginTop: 7, flexDirection:'row'}}>
                            <Text style = {[Styles.text2]}>{nomeAtualizado}</Text> 
                        </View>     

                    </View>       

                    <View style = {{marginTop: 130, flexDirection:'row', justifyContent:'space-between'}}>
                        <View>
                            <TouchableOpacity style = {{alignItems:'center'}} onPress={() => {Sair()}} >
                                <Image source = {require('../../assets/icons/logout.png')} style={{ width: 60, height: 60 }} /> 
                                <Text style = {[Styles.textEsc]}>Sair</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity style = {{alignItems:'center'}}  onPress={() => {Deletar()}}>
                                <Image source = {require('../../assets/icons/delete.png')} style={{ width: 60, height: 60 }} /> 
                                <Text style = {Styles.textEsc}>Deletar Conta</Text>
                            </TouchableOpacity>
                        </View>
                       
                    </View>

                </View>  

                <View style = {Styles.formEnd}>
                    <TouchableOpacity onPress={Home}>
                        <Image source = { require('../../assets/icons/home.png')} style={{ width: 24, height: 24 }} />               
                    </TouchableOpacity>

                    <TouchableOpacity onPress={dados} >
                        <Image source = { require('../../assets/icons/dados.png')} style={{ width: 24, height: 24 }} />      
                    </TouchableOpacity>

                    <TouchableOpacity >    
                        <Image source = { require('../../assets/icons/ConfB.png')} style={{ width: 24, height: 24 }} /> 
                    </TouchableOpacity>
                 </View>
          
            </SafeAreaView>
        </View>
    );
}