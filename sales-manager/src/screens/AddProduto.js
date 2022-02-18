import React ,{ useState, useContext , useEffect} from "react";
import { View, SafeAreaView, Text} from 'react-native';
import { ButtonOne } from "../components/ButtonOne";
import { FormInput } from "../components/FormInput";
import { Styles } from "../components/Styles";
import { db } from "../util/Firebase";
import { AuthContext } from "../context/AuthContext";

export function AddProduto({navigation, route}){

    const { user } = useContext(AuthContext);

    const [Nome, setNome] = useState('');
    const [Preco, setPreco] = useState('');
    const [Data, setData] = useState('');
    const [Quantidade, setQtd] = useState('');
    const [docName, setDocName] = useState(null);
    const [Divida, setDivida] = useState(null);
    const [Lucro, setLucro] = useState(null);
    const [msg, setMsg] = useState(null);

    { (route.params.verifica)?
       ( useEffect(() => {
            let nomes = [];
            let ids = []
            
            async function loadProds() {
                await db.collection('Usuários').doc(user.uid).collection('Clientes').get().then(querySnapshot => {
                    querySnapshot.docs.forEach(doc => {
                        nomes.push(doc.data().Nome);
                        ids.push(doc.id);
                    },
                        db.doc('Usuários/' + user.uid).get().then( // percorre o bd
                            doc=>{
                                if(doc.exists){ 
                                    setLucro(doc.data().Lucro);
                                }
                            }
                        )       
                    );
                });

                let pos = nomes.indexOf(route.params.buscado);

                for(var i = 0; i < ids.length; i++){
                    if(i === pos){
                        let id = ids[i];
                        setDocName(id);
                    }
                }
            }
            loadProds();
        }, [])

       ):(
            useEffect(() => {
                console.log('aqui estou false');
            
                setDocName(route.params.buscado);
                setDivida(route.params.div);
                setLucro(route.params.lucro);
            }, []))
            
    }

    function addProduto(){
        console.log("final", docName);

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

        if(route.params.verifica){
            let QuantidadeF = parseInt(Quantidade);
            let PrecoF = parseFloat(Preco) * QuantidadeF;

            db.collection("Usuários").doc(user.uid).collection("Clientes").doc(docName).collection("Produtos").add({
                Nome: Nome,
                Preco: PrecoF,
                Data: Data,
                Quantidade: QuantidadeF,
            },
                db.collection("Usuários").doc(user.uid).collection("Clientes").doc(docName).update({
                    Divida: PrecoF,
                },
                    db.collection("Usuários").doc(user.uid).update({
                        Lucro: Lucro + PrecoF,
                    })
                )
            );

            navigation.navigate('Home');
        }
        else{

            let QuantidadeF = parseInt(Quantidade);
            let PrecoF = parseFloat(Preco) * QuantidadeF;

            db.collection("Usuários").doc(user.uid).collection("Clientes").doc(docName).collection("Produtos").add({
                Nome: Nome,
                Preco: PrecoF,
                Data: Data,
                Quantidade: QuantidadeF,
            },
                db.collection("Usuários").doc(user.uid).collection("Clientes").doc(docName).update({
                    Divida: Divida + PrecoF,
                },
                    db.collection("Usuários").doc(user.uid).update({
                        Lucro: Lucro + PrecoF,
                    })
                )
            );

            navigation.navigate('Home');
        }
    }

    return(
        <View style = {{flex: 1}}>
            <SafeAreaView style = {{flex:1, marginHorizontal: 25, marginVertical: 50}}>
                
                <View style = {{flex: 1, justifyContent:'space-between'}}>

                    <View style = {{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>

                        <View style = {{alignItems:'center'}}>
                            <Text style = {Styles.text5}>Ficha do Cliente</Text>
                        </View>

                    </View>

                    <View >
                        <Text style={{ textAlign: 'center', color: '#6D3F8C' }}>{msg}</Text>
                        <View style = {{marginTop: 20}}>
                            <FormInput holder = 'Produto' image = {false} onChangeText = {text => setNome(text)}/>
                        </View>

                        <View style = {{marginTop: 20}}>
                            <FormInput holder = 'Preço' n = {true} image = {false} onChangeText = {text => setPreco(text)}/>
                        </View>

                        <View style = {{marginTop: 20}}>
                            <FormInput holder = 'Data' image = {false} onChangeText = {text => setData(text)}/>
                        </View>

                        <View style = {{marginTop: 20}}>
                            <FormInput holder = 'Quantidade' image = {false} n = {true} onChangeText = {text => setQtd(text)}/>
                        </View>         

                    </View>

                    <View style = {{marginTop: 40, alignItems:'center'}}>
                        <ButtonOne title = 'Salvar' onPress = {addProduto}/>
                    </View>
                    
                </View>
            </SafeAreaView>
        </View>
    );
}