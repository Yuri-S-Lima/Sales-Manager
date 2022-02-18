import React ,{ useContext ,useState } from "react";
import { SafeAreaView } from "react-native";
import { Styles } from "../components/Styles";
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { FormInput } from "../components/FormInput";
import { SocialLogin } from "../components/SocialLogin";
import { ButtonOne } from "../components/ButtonOne";
import { auth } from "../util/Firebase";
import { AuthContext } from "../context/AuthContext";

function LogIn({navigation}){

    const { setUser } = useContext(AuthContext);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState(null);

    function cadastrar(){
        navigation.navigate('Cadastrar')
    }

    function next(){

        if ((!email) || (email == '')) {
            setMsg('Email inválido');
            return;
        }

        if ((!password) || (password.length < 6)) {
            setMsg('Senha inválida');
            return;
        }

        setMsg(null);

        auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
            setUser(userCredential.user);
            navigation.navigate('Home');
        }
        ).catch((error) => {
            if (error.code = 'auth/wrong-password') {
                setMsg('Usuário ou senha inválidos');
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
    
                        <Text style = {[Styles.pageTitle]}>Entre com</Text>
                        <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}> 
                            <SocialLogin social = 'Google'/>
                            <SocialLogin social = 'Facebook'/>
                        </View>
    
                        <Text style={{ textAlign: 'center', color: '#6D3F8C' }}>{msg}</Text>
                        <View style = {{marginTop: 20}}>
                    
                            <FormInput holder = 'E-Mail' email = {true} image = {true} onChangeText={text => setEmail(text)}/>
                            <FormInput holder = 'Senha' password = {true} onChangeText={text => setPassword(text)} />
                        </View>
    
                        <View style = {{marginTop: 38, alignItems:'center'}}>
                            <ButtonOne title = 'Entrar' onPress = {next} />
                            <TouchableOpacity  onPress = {cadastrar}>
                                <Text style = {Styles.textEsc}>Não possui uma conta? Faça seu registro</Text>
                            </TouchableOpacity>
                         </View>
    
                    </View>
                        
                </SafeAreaView>
        </View>
    );
}

export default LogIn;