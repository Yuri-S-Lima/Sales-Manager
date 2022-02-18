import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import LogIn from './src/screens/LogIn';
import Home from './src/screens/Home';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { Data } from './src/screens/Data';
import { Escolha } from './src/screens/Escolha';
import { AddCliente } from './src/screens/AddCliente';
import { AddProduto } from './src/screens/AddProduto';
import { BuscarCliente } from './src/screens/BuscarCliente';
import { Pagamento } from './src/screens/Pagamento';
import { Config } from './src/screens/Config';
import { ClienteData } from './src/screens/ClienteData';
import { Consulta } from './src/screens/Consulta';
import Cadastrar from './src/screens/Cadastrar';
import { EditarCliente } from './src/screens/EditarCliente';
import { EditarProduto } from './src/screens/EditarProduto';
import { SelecionaPag } from './src/screens/SelecionaPag';
import AuthProvider from './src/context/AuthContext';
import { Pagando } from './src/screens/Pagando';
import { Pagos } from './src/screens/Pagos';
import { EditarUsuario } from './src/screens/EditarUsuario';

export default function App() {

  const [loaded] = useFonts({
    Archivo: require('./assets/fonts/Archivo-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }
  
  const Stack = createNativeStackNavigator();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#E7DCF2', 
    },
  };

  LogBox.ignoreLogs(['Setting a timer']);

  return (
    <NavigationContainer theme = {MyTheme}>

      <AuthProvider>

        <Stack.Navigator
            initialRouteName="LogIn"
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
            }}
          >

            <Stack.Screen
              name="LogIn"
              component={LogIn}
            />

            <Stack.Screen
              name="Home"
              component={Home}
            />

            <Stack.Screen
              name="Data"
              component={Data}
            />

            <Stack.Screen
              name="Pagamento"
              component={Pagamento}
            />

            <Stack.Screen
              name='SelecionaPag'
              component={SelecionaPag}
            />

            <Stack.Screen
              name='EditarUsuario'
              component={EditarUsuario}
            />

            <Stack.Screen
              name='Pagando'
              component={Pagando}
            />

            <Stack.Screen
              name='Pagos'
              component={Pagos}
            />

            <Stack.Screen
              name="Cadastrar"
              component={Cadastrar}
            />

            <Stack.Screen
              name="Consulta"
              component={Consulta}
            />  

            <Stack.Screen
              name="Escolha"
              component={Escolha}
            />  

            <Stack.Screen
              name="BuscarCliente"
              component={BuscarCliente}
            />  

            <Stack.Screen
              name="ClienteData"
              component={ClienteData}
            /> 

            <Stack.Screen
              name="EditarCliente"
              component={EditarCliente}
            />

            <Stack.Screen
              name="EditarProduto"
              component={EditarProduto}
            />

            <Stack.Screen
              name="AddCliente"
              component={AddCliente}
            />

            <Stack.Screen
              name="AddProduto"
              component={AddProduto}
            />  

            <Stack.Screen
              name="Config"
              component={Config}
            /> 
          </Stack.Navigator>

        </AuthProvider>
    </NavigationContainer>
  );
}

{/* <LoginStack.Navigator initialRouteName="Cadastrar" screenOptions = {{ headerShown: false }}>
        <LoginStack.Screen name = 'Cadastrar' component = {Cadastrar}/> */}

/*         <LoginStack.Navigator initialRouteName="LogIn" screenOptions = {{ headerShown: false }}>
        <LoginStack.Screen name = 'LogIn' component = {LogIn}/> */
        
       /*  <LoginStack.Navigator initialRouteName="Home" screenOptions = {{ headerShown: false }}>
        <LoginStack.Screen name = 'Home' component = {Home}/> */

       /*  <LoginStack.Navigator initialRouteName="Data" screenOptions = {{ headerShown: false }}>
        <LoginStack.Screen name = 'Data' component = {Data}/> */

       /*  <LoginStack.Navigator initialRouteName="Escolha" screenOptions = {{ headerShown: false }}>
        <LoginStack.Screen name = 'Escolha' component = {Escolha}/> */

        {/* <LoginStack.Navigator initialRouteName="AddCliente" screenOptions = {{ headerShown: false }}>
        <LoginStack.Screen name = 'AddCliente' component = {AddCliente}/> */}

       /*  <LoginStack.Navigator initialRouteName="AddProduto" screenOptions = {{ headerShown: false }}>
        <LoginStack.Screen name = 'AddProduto' component = {AddProduto}/> */

      /*   <LoginStack.Navigator initialRouteName="BuscarCliente" screenOptions = {{ headerShown: false }}>
        <LoginStack.Screen name = 'BuscarCliente' component = {BuscarCliente}/> */

       /*  <LoginStack.Navigator initialRouteName="Pagamento" screenOptions = {{ headerShown: false }}>
        <LoginStack.Screen name = 'Pagamento' component = {Pagamento}/> */

       /*  <LoginStack.Navigator initialRouteName="Configurações" screenOptions = {{ headerShown: false }}>
        <LoginStack.Screen name = 'Configurações' component = {Config}/>
      </LoginStack.Navigator> */

     /*  <LoginStack.Navigator initialRouteName="Dados do Cliente" screenOptions = {{ headerShown: false }}>
        <LoginStack.Screen name = 'Dados do Cliente' component = {ClienteData}/> */

       /*  <LoginStack.Navigator initialRouteName="Consulta" screenOptions = {{ headerShown: false }}>
        <LoginStack.Screen name = 'Consulta' component = {Consulta}/> */

   /*      <LoginStack.Navigator initialRouteName="Abertura" screenOptions = {{ headerShown: false }}>
        <LoginStack.Screen name = 'Abertura' component = {Abertura}/> */

       /*  <LoginStack.Navigator initialRouteName="EditarCliente" screenOptions = {{ headerShown: false }}>
        <LoginStack.Screen name = 'EditarCliente' component = {EditarCliente}/>  */

        {/* <LoginStack.Navigator initialRouteName="EditarProduto" screenOptions = {{ headerShown: false }}>
        <LoginStack.Screen name = 'EditarProduto' component = {EditarProduto}/> */}