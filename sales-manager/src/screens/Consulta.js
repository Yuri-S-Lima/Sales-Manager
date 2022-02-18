import React ,{ useState, useEffect, useContext } from "react";
import { View, SafeAreaView, TouchableOpacity, Text, FlatList } from 'react-native';
import { InputBusca } from "../components/InputBusca";
import { Styles } from "../components/Styles";
import { TypeText } from "../components/TypeText";
import { FormCard } from "../components/FormCard";
import { AuthContext } from "../context/AuthContext";
import { db } from "../util/Firebase";
import { useIsFocused } from "@react-navigation/native";

export function Consulta({navigation}){

    const [clientes, setClientes] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const [Lucro, setLucro] = useState(null);
    const { user } = useContext(AuthContext);
    const isFocused = useIsFocused();

    useEffect(() => {

        loadUsuarios();

    }, [isFocused]);

    async function loadUsuarios() {
        await db.collection('Usuários').doc(user.uid).collection('Clientes').get().then((query) => {
            let nomes = []; 
            query.forEach((doc) => {
                nomes.push({...doc.data()});
            });
            setClientes([...nomes]);
            
            db.collection('Usuários').doc(user.uid).get().then((doc) => {
                setLucro(doc.data().Lucro);       
            });
        });
    }

    function deletar(nome, div){
        let ids = []
        let clientesNome = []
        let idFinal;
     
        db.collection('Usuários').doc(user.uid).collection('Clientes').get().then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                ids.push(doc.id);
                clientesNome.push(doc.data().Nome);
            });

            let pos = clientesNome.indexOf(nome);
           
 
            for(var i = 0; i < ids.length; i++){
                if(i === pos){
                    idFinal = ids[i];
                    console.log(idFinal)
                }
            }

            let idsProdutos = []
            let idFinalProdutos;

            db.collection("Usuários").doc(user.uid).collection("Clientes").doc(idFinal).collection("Produtos").get().then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {     
                    idsProdutos.push(doc.id);
                });   
    
                var c = 0;
                for(var i = 0; i < idsProdutos.length; i++){
                    
                    idFinalProdutos = idsProdutos[i];
                    console.log('Produtos', idFinalProdutos);
                    db.collection('Usuários').doc(user.uid).collection('Clientes').doc(idFinal).collection("Produtos").doc(idFinalProdutos).delete()
                    c++;
                }
                console.log(idsProdutos.length);
                if(c == idsProdutos.length){
                    db.collection('Usuários').doc(user.uid).collection('Clientes').doc(idFinal).delete();
                }

                db.collection("Usuários").doc(user.uid).update({
                    Lucro: Lucro - div,
                })
            }) ;
            loadUsuarios();    
        });
    }

    function dadosCliente(nome, divida){
        let nomes = [];
        let iDs = [];
        let ide;

        db.collection('Usuários').doc(user.uid).collection('Clientes').get().then((querySnapshot) => {
                
            querySnapshot.docs.forEach((doc) => {
                nomes.push(doc.data().Nome);
                iDs.push(doc.id);
                console.log(doc.id);
            })

            let pos = nomes.indexOf(nome);
            console.log(pos);

            for(var i = 0; i < iDs.length; i++){
                
                if(i === pos){
                    ide = iDs[i];
                    console.log('id', ide)
                }
            }

            navigation.navigate("ClienteData", {Nome: nome, Divida: divida, id: ide})

        })   
    }

    function voltar(){
        navigation.navigate('Home');
    }

    return(
        <View style = {{flex: 1, marginHorizontal: 25, marginTop: 50}}>

            <View>

                <TypeText textTitle = 'Consultar Cliente' onPress = {voltar}/>
                <View style = {{marginTop:50}} ><InputBusca buscaTitulo = 'Buscar Cliente' image = {false} onChangeText = {setPesquisa}/></View>

                <View style = {{alignItems:'center', marginTop: 26}}>
                    <Text style = {Styles.text5}>Clientes</Text>
                </View>
                
            </View>

            { clientes != null?
                <FlatList
                    
                    keyExtractor={(item) => item.Nome}
                    data={clientes.filter(n => n.Nome.includes(pesquisa))}
                    renderItem={({ item }) => 
                        <TouchableOpacity onPress={() => dadosCliente(item.Nome, item.Divida)}>                   
                            <FormCard nome = {item.Nome} Rua = {item.Rua} Telefone = {item.Telefone} Bairro = {item.Bairro} Numero = {item.Numero} Divida = {item.Divida} onPress = {()=>{deletar(item.Nome, item.Divida)}} />
                        </TouchableOpacity>    
                    }
                />:<Text style = {Styles.textSocial}>CARREGANDO....</Text>
            }
  
        </View>
    );
}