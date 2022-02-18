import React ,{ useState, useEffect, useContext } from "react";
import { View, SafeAreaView, TouchableOpacity, Text, FlatList } from 'react-native';
import { Styles } from "../components/Styles";
import { TypeText } from "../components/TypeText";
import { db } from "../util/Firebase";
import { AuthContext } from "../context/AuthContext";
import { useIsFocused } from "@react-navigation/native";

export function Pagos({navigation, route}){

    const { user } = useContext(AuthContext);
    const [pagos, setPagamentos] = useState(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        
        async function loadVendas() {
            await db.collection('Usuários').doc(user.uid).collection('Clientes').doc(route.params.id).collection('Pagamentos').get().then((querySnapshot) => {
     
                let pagos = [];  
             
                querySnapshot.docs.forEach((doc) => {
                    pagos.push(doc.data());
                });

                setPagamentos(pagos);

            });
        }

        loadVendas();
       
    }, [isFocused]);

    function dadosCliente(){
        navigation.navigate("ClienteData", {Nome: route.params.Nome, Divida: route.params.Divida, id: route.params.id});
    }

    return(
        <View style = {{flex: 1}}>
            <SafeAreaView style = {{flex:1, marginHorizontal: 25, marginVertical: 50}}>
                <View style = {{flex:1}}>

                    <TypeText textTitle = 'Pagamento' onPress = {dadosCliente} />

                </View>   

                <View style = {{flex:1 ,alignItems:'center'}}>
                    <Text style = {Styles.text5}>Compras pagas</Text>
                </View>

                { (pagos != null) ?
                    <FlatList
                        keyExtractor={(item) => item.Nome}
                        data={pagos}
                        renderItem={({ item }) =>       

                            <TouchableOpacity onPress={()=>{telaPag(item.Nome)}}>
                                <View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                    <Text style = {Styles.text5}>{item.Nome}</Text>
                                    <Text style = {Styles.text5}>{item.Data}</Text>
                                    <Text style = {Styles.text2}>{item.Preco}</Text>
                                </View>
                            </TouchableOpacity>
                            
                        }
                    /> : <Text style = {Styles.textSocial}>CARREGANDO....</Text>
                }
       
            </SafeAreaView>
        </View>
    );
}