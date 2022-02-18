import React ,{ useState, useEffect, useContext } from "react";
import { View, SafeAreaView, Text } from 'react-native';
import { ButtonOne } from "../components/ButtonOne";
import { FormInput } from "../components/FormInput";
import { Styles } from "../components/Styles";
import { TypeText } from "../components/TypeText";
import { db } from "../util/Firebase";
import { AuthContext } from "../context/AuthContext";

export function Pagando({navigation, route}){
    
    const { user } = useContext(AuthContext);
    let listaProdutos = route.params.produtos;
    let produtoBuscado = route.params.Nome;
    let id = route.params.Id;

    const [Nome, setNome] = useState('');
    const [Preco, setPreco] = useState('');
    const [Data, setData] = useState('');
    const [Pagamento, setPagamento] = useState('');
    const [Quantidade, setQ] = useState('');
    const [Produtos, setP] = useState(null);
    const [msg, setMsg] = useState(null);
    const [PrecoSemAlteracao, setPSA] = useState('');
    const [Lucro, setLucro] = useState(null);

    useEffect(() => {
     
        var lista = listaProdutos.filter(nome => (nome.Nome) === produtoBuscado);
        
    
        lista.forEach(produtos => { 
            setP(produtos);

            setPreco(produtos.Preco.toString());
            setData(produtos.Data);
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

    function pagarProduto(){

        let ids = []
        let produtosNome = []
        let idFinal;

        if ((Pagamento == '')) {
            setMsg('Pagamento inválido');
            return;
        }

        if(Pagamento != PrecoSemAlteracao){
            setMsg('Pagamento inválido, esperava-se um valor de ' +  Preco);
            return;
        }

        db.collection("Usuários").doc(user.uid).collection("Clientes").doc(id).collection("Produtos").get().then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {     
                ids.push(doc.id);
                produtosNome.push(doc.data().Nome);
            });

            let pos = produtosNome.indexOf(produtoBuscado);
            let pagamentoF = parseFloat(Pagamento);
            let QuantidadeF = parseInt(Quantidade);
            let PrecoF = parseFloat(Preco);
 
            for(var i = 0; i < ids.length; i++){
                if(i === pos){
                    idFinal = ids[i];
                    console.log(idFinal)
                }
            }

            db.collection('Usuários').doc(user.uid).collection('Clientes').doc(id).collection("Produtos").doc(idFinal).delete();

            db.collection("Usuários").doc(user.uid).collection("Clientes").doc(id).update({
                Divida: (route.params.Divida - pagamentoF),
            })

            db.collection("Usuários").doc(user.uid).collection("Clientes").doc(id).collection("Pagamentos").add({
                Nome: Nome,
                Preco: PrecoF,
                Data: Data,
                Quantidade: QuantidadeF,
            })

            navigation.navigate('SelecionaPag', {id: id, Divida: (route.params.Divida - pagamentoF)});
        })
     
        
    }
    
    function voltar(){
        navigation.navigate('SelecionaPag', {id: id, Divida: route.params.Divida});
    }

    return(
        <View style = {{flex: 1}}>
            <SafeAreaView style = {{flex:1, marginHorizontal: 25, marginVertical: 50}}>
                
                {(Produtos != null) ?
                    <View style = {{flex:1, justifyContent:'space-between'}}>

                        <TypeText textTitle = 'Pagamento' onPress = {voltar}/>

                        <View>
                            <Text style={{ textAlign: 'center', color: '#6D3F8C' }}>{msg}</Text>
                            <View style = {{marginTop: 20}}>
                                <FormInput image = {false} value = {Nome}/>
                            </View>

                            <View style = {{marginTop: 20}}>
                                <FormInput image = {false} value = {Preco}/>
                            </View>

                            <View style = {{marginTop: 20}}>
                                <FormInput image = {false} value = {Quantidade.toString()}/>
                            </View>  

                            <View style = {{marginTop: 20}}>
                                <FormInput holder = 'Valor do pagamento' image = {false} n = {true} onChangeText = {text => setPagamento(text)}/>
                            </View>         

                        </View>

                        <View style = {{marginTop: 40, alignItems:'center'}}>
                            <ButtonOne title = 'Salvar'  onPress = {pagarProduto}/>
                        </View>
                    </View>

                    : <Text style = {Styles.textSocial}>CARREGANDO....</Text>
                }
            </SafeAreaView>
        </View>
    );
}