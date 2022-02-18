import React ,{ useState, useContext, useEffect } from "react";
import { View, SafeAreaView, TouchableOpacity, Text, Image, FlatList  } from 'react-native';
import { Styles } from "../components/Styles";
import { db } from "../util/Firebase";
import { AuthContext } from "../context/AuthContext";
import { useIsFocused } from "@react-navigation/native";

export function ClienteData({navigation, route}){

    const { user } = useContext(AuthContext);
    const [produtos, setProdutos] = useState(null);
    const [id, setId] = useState('');
    const [div, setDiv] = useState(null);
    const [devedor, setDev] = useState(null);
    const [Lucro, setLucro] = useState(null);
    const isFocused = useIsFocused();
    
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

            if(div == null){
                setDev(route.params.Divida.toString());
                setDiv(route.params.Divida);
            }
            setProdutos(vendas);
        
            db.collection('Usuários').doc(user.uid).get().then((doc) => {
                setLucro(doc.data().Lucro);       
            })

        });
    }

    useEffect( () => {           
        loadVendas();
    }, [isFocused]);
           
    function editeCliente(){
        console.log("cliente id", id);
        navigation.navigate("EditarCliente", {Nome: route.params.Nome, Id: id, div: div});
    }

    function editeVenda(nomeProduto){
        navigation.navigate("EditarProduto", {produtos: produtos, Nome: nomeProduto, Id: id, Divida: div});
    }

    function comprasPagas(){
        navigation.navigate("Pagos", {id: id, Nome: route.params.Nome, Divida: div});
    }

    function deleteProduto(nome, valor){
        let ids = []
        let produtosNome = []
        let idFinal;

        db.collection("Usuários").doc(user.uid).collection("Clientes").doc(id).collection("Produtos").get().then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {     
                ids.push(doc.id);
                produtosNome.push(doc.data().Nome);
            });

            let pos = produtosNome.indexOf(nome);
           
 
            for(var i = 0; i < ids.length; i++){
                if(i === pos){
                    idFinal = ids[i];
                    console.log(idFinal)
                }
            }
           
            db.collection('Usuários').doc(user.uid).collection('Clientes').doc(id).collection("Produtos").doc(idFinal).delete()

            db.collection("Usuários").doc(user.uid).collection("Clientes").doc(id).update({
                Divida: div - valor,
            },
                setDiv(div - valor)
            )

            db.collection("Usuários").doc(user.uid).update({
                Lucro: Lucro - valor
            })

            let v = div - valor;
            setDev(v.toString());
            setDiv(v);

            loadVendas();
        })
    }

    function voltar(){
        navigation.navigate('Consulta');
    }
  
    return(
        <View style = {{flex: 1}}>
            <SafeAreaView style = {{flex:1, marginHorizontal: 25, marginVertical: 50}}>

                <View style = {{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>

                    <View style = {{alignItems:'center'}}>
                        <Text style = {Styles.text5}>Ficha do Cliente</Text>
                    </View>

                    <TouchableOpacity onPress={voltar}>
                        <Image source={require('../../assets/icons/voltar.png')} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>

                </View>
                
                <View style = {{flex:1, justifyContent:'center'}}>

                    <View style = {{marginTop: 44, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <View style = {{flexDirection:'row'}}>
                            <Text style = {Styles.text2}>{route.params.Nome}</Text>
                            <TouchableOpacity style = {{marginLeft: 5}} onPress = {editeCliente}><Image source = {require('../../assets/icons/editar.png')} style={{ width: 24, height: 24 }} /></TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity onPress = {comprasPagas}>
                                <Text style = {Styles.text2}>Pagamentos</Text>
                            </TouchableOpacity>
                        </View>         
                    </View>

                </View>  

                { (produtos != null) ?
                    <FlatList
                        keyExtractor={(item) => item.Nome}
                        data={produtos}
                        renderItem={({ item }) =>       

                            <View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                <Text style = {Styles.text5}>{item.Nome}</Text>
                                <Text style = {Styles.text5}>{item.Data}</Text>
                                <Text style = {Styles.text2}>{item.Preco}</Text>
                                <TouchableOpacity onPress={ () => {deleteProduto(item.Nome, item.Preco)}}><Image source = {require('../../assets/icons/delete.png')} style={{ width: 24, height: 24 }} /></TouchableOpacity>
                                <TouchableOpacity onPress = {() => {editeVenda(item.Nome)}} ><Image source = {require('../../assets/icons/editar.png')} style={{ width: 24, height: 24 }} /></TouchableOpacity>
                            </View>
                            
                        }
                    /> : <Text style = {Styles.textSocial}>CARREGANDO....</Text>
                }


                <View style = {{marginTop: 70}}>
                    <View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <Text style = {Styles.text2}>Saldo Devedor</Text>
                        <Text style = {Styles.text2}>{`R$ ${devedor},00`}</Text>
                    </View>

                </View>

            </SafeAreaView>
        </View>
    );
}