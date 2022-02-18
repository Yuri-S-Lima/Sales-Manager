import React ,{ useState, useEffect, useContext } from "react";
import { View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { ButtonOne } from "../components/ButtonOne";
import { FormInput } from "../components/FormInput";
import { Styles } from "../components/Styles";
import { TypeText } from "../components/TypeText";
import { db } from "../util/Firebase";
import { AuthContext } from "../context/AuthContext";

export function EditarProduto({navigation, route}){
    
    const { user } = useContext(AuthContext);
    let listaProdutos = route.params.produtos;
    let produtoBuscado = route.params.Nome;
    let id = route.params.Id;

    const [Nome, setNome] = useState('');
    const [Preco, setPreco] = useState('');
    const [Data, setData] = useState('');
    const [Quantidade, setQ] = useState('');
    const [Produtos, setP] = useState(null);
    const [PrecoSemAlteracao, setPSA] = useState('');
    const [Lucro, setLucro] = useState(null);
    const [msg, setMsg] = useState(null);

    useEffect(() => {
     
        var lista = listaProdutos.filter(nome => (nome.Nome) === produtoBuscado);
        
    
        lista.forEach(produtos => { 
            setP(produtos);

            setData(produtos.Data);
            setPreco(produtos.Preco.toString());
            setPSA(produtos.Preco);
            setNome(produtos.Nome);
            setQ(produtos.Quantidade);
        },
            db.doc('Usuários/' + user.uid).get().then( // percorre o bd
                doc=>{
                    if(doc.exists){ 
                        setLucro(doc.data().Lucro);
                    }
                }
            )
        )

    
    }, [])

    function editarProduto(){

        if ((Nome == '')) {
            setMsg('Nome inválido');
            return;
        }

        if ((Preco == '')) {
            setMsg('Preço inválido');
            return;
        }

        if ((Data == '')) {
            setMsg('Data inválida');
            return;
        }

        if ((Quantidade == '')) {
            setMsg('Quantidade inválida');
            return;
        }

        let ids = []
        let produtosNome = []
        let idFinal;

        db.collection("Usuários").doc(user.uid).collection("Clientes").doc(id).collection("Produtos").get().then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {     
                ids.push(doc.id);
                produtosNome.push(doc.data().Nome);
            });

            let pos = produtosNome.indexOf(produtoBuscado);
           
 
            for(var i = 0; i < ids.length; i++){
                if(i === pos){
                    idFinal = ids[i];
                    console.log(idFinal)
                }
            }

            let QuantidadeF = parseInt(Quantidade);
            let PrecoF = parseFloat(Preco) * QuantidadeF;

            db.collection("Usuários").doc(user.uid).collection("Clientes").doc(id).collection("Produtos").doc(idFinal).update({
                Nome: Nome,
                Preco: PrecoF,
                Data: Data,
                Quantidade: QuantidadeF,
            });

            db.collection("Usuários").doc(user.uid).collection("Clientes").doc(id).update({
                Divida: (route.params.Divida - PrecoSemAlteracao) + PrecoF,
            })

            db.collection("Usuários").doc(user.uid).update({
                Lucro: (Lucro - PrecoSemAlteracao) + PrecoF,
            })

            navigation.navigate('ClienteData', {Nome: Nome, Divida: (route.params.Divida - PrecoSemAlteracao) + PrecoF, id: id});
        })   
    }
    
    function voltar(){
        navigation.navigate('ClienteData', {Nome: Nome, Divida: route.params.Divida, id: id});
    }

    return(
        <View style = {{flex: 1}}>
            <SafeAreaView style = {{flex:1, marginHorizontal: 25, marginVertical: 50}}>
                
                {(Produtos != null) ?
                    <View style = {{flex:1, justifyContent:'space-between'}}>

                        <TypeText textTitle = 'Editar Venda' onPress = {voltar} />

                        <View>
                            <Text style={{ textAlign: 'center', color: '#6D3F8C' }}>{msg}</Text>
                            <View style = {{marginTop: 20}}>
                                <FormInput holder = 'Produto' image = {false} value = {Nome} onChangeText = {text => setNome(text)}/>
                            </View>

                            <View style = {{marginTop: 20}}>
                                <FormInput holder = 'Preço' image = {false} value = {Preco} n = {true} onChangeText = {text => setPreco(text)}/>
                            </View>

                            <View style = {{marginTop: 20}}>
                                <FormInput holder = 'Data' image = {false} value = {Data} onChangeText = {text => setData(text)}/>
                            </View>

                            <View style = {{marginTop: 20}}>
                                <FormInput holder = 'Quantidade' image = {false} value = {Quantidade.toString()} n = {true} onChangeText = {text => setQ(text)}/>
                            </View>         

                        </View>

                        <View style = {{marginTop: 40, alignItems:'center'}}>
                            <ButtonOne title = 'Salvar'  onPress = {editarProduto}/>
                        </View>
                    </View>

                    : <Text style = {Styles.textSocial}>CARREGANDO....</Text>
                }
            </SafeAreaView>
        </View>
    );
}