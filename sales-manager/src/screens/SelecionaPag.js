import React ,{ useState, useEffect, useContext } from "react";
import { View, SafeAreaView, TouchableOpacity, Text, FlatList, Image } from 'react-native';
import { Styles } from "../components/Styles";
import { TypeText } from "../components/TypeText";
import { db } from "../util/Firebase";
import { AuthContext } from "../context/AuthContext";
import { useIsFocused } from "@react-navigation/native";

export function SelecionaPag({navigation, route}){

    const { user } = useContext(AuthContext);
    const [produtos, setProdutos] = useState(null);
    const [id, setId] = useState('');
    const [div, setDiv] = useState(null);
    const [devedor, setDev] = useState(null);
    const [Lucro, setLucro] = useState(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        
        async function loadVendas() {
            await db.collection('Usuários').doc(user.uid).collection('Clientes').doc(route.params.id).collection('Produtos').get().then((querySnapshot) => {
                   
                setId(route.params.id); 
                let vendas = [];  
                let idPs = []   
                querySnapshot.docs.forEach((doc) => {
                    vendas.push(doc.data());
                    idPs.push(doc.id);
                    console.log('pro', doc.data())
                });

                setProdutos(vendas);
                setDev(route.params.Divida.toString());
                setDiv(route.params.Divida);
            
                db.collection('Usuários').doc(user.uid).get().then((doc) => {
                    setLucro(doc.data().Lucro);       
                })

            });
        }

        loadVendas();
       
    }, [isFocused]);

    function telaPag(nomeProduto){
        navigation.navigate("Pagando", {produtos: produtos, Nome: nomeProduto, Id: id, Divida: div});
    }

    function voltar(){
        navigation.navigate('Pagamento');
    }

    return(
        <View style = {{flex: 1}}>
            <SafeAreaView style = {{flex:1, marginHorizontal: 25, marginVertical: 50}}>
                <View style = {{flex:1}}>

                    <TypeText textTitle = 'Pagamento' onPress={voltar}/>

                </View>   

                <View style = {{flex:1 ,alignItems:'center'}}>
                    <Text style = {Styles.text5}>Escolha uma das contas para pagamento</Text>
                </View>

                { (produtos != null) ?
                    <FlatList
                        keyExtractor={(item) => item.Nome}
                        data={produtos}
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