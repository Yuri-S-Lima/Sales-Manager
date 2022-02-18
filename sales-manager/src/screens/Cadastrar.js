import React ,{ useState, useContext } from "react";
import { SafeAreaView, TextInput } from "react-native";
import { Styles } from "../components/Styles";
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { FormInput } from "../components/FormInput";
import { SocialLogin } from "../components/SocialLogin";
import { ButtonOne } from "../components/ButtonOne";
import { auth } from "../util/Firebase";
import { db } from "../util/Firebase";

function Cadastrar({navigation}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usuario, setUsuario] = useState('');
    const [msg, setMsg] = useState(null);

    const nameColection = "Usuários";

    function entrar(){
        navigation.navigate('LogIn')
    }

    function criaUsuario(){
        let user = auth.currentUser.uid;
        db.collection(nameColection).doc(user).set({
            NomeUsuario: usuario,
            Lucro: 0
        });
    }

    function criarConta(){

        if ((!email) || (email == '')) {
            setMsg('Email inválido');
            return;
        }

        if ((!password) || (password.length < 6)) {
            setMsg('Senha inválida');
            return;
        }

        if ((!usuario) || (usuario == '')) {
            setMsg('Usuário inválido');
            return;
        }

        setMsg(null);

        auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
            console.log(email)
            criaUsuario(userCredential);
            navigation.navigate('LogIn');
        })
        .catch((error) => {
            if (error.code = 'auth/wrong-password') {
                setMsg('Falha ao criar a conta');
            } else {
                setMsg('Erro ao autenticar. Verifique sua conexão com a Internet.');
            }
        });
      
    }

    return(
        <View style = {{flex: 1}}>
            <SafeAreaView style = {{flex:1, marginHorizontal: 25, marginVertical: 50}}>
                    
                <View style = {{flex:1, justifyContent:'center'}}>

                    <View style = {{alignItems: 'center'}}>
                        <Image source={require('../../assets/icons/logo.png')} style = {{width: 150, height: 150}}/>
                    </View>

                    <Text style = {Styles.pageTitle}>Cadastre-se com</Text>
                    <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}> 
                        <SocialLogin social = 'Google'/>
                        <SocialLogin social = 'Facebook'/>
                    </View>

                    <Text style={{ textAlign: 'center', color: '#6D3F8C' }}>{msg}</Text>
                    <View style = {{marginTop: 20}}>
                       
                        <FormInput holder = 'Usuário' image = {true} onChangeText={text => setUsuario(text)} />
                        <FormInput holder = 'E-Mail' email = {true} image = {true} onChangeText={text => setEmail(text)}/>
                        <FormInput holder = 'Senha' password = {true} onChangeText={text => setPassword(text)} />
                    </View>

                    <View style = {{marginTop: 38, alignItems:'center'}}>
                        <ButtonOne title = 'Registrar'  onPress = {criarConta}/>
                        <TouchableOpacity onPress = {entrar}>
                            <Text style = {Styles.textEsc}>Possui uma conta? Faça login</Text>
                        </TouchableOpacity>
                     </View>

                </View>
                    
            </SafeAreaView>
        </View>
    );
}

export default Cadastrar;