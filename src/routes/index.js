/*
Componente de condicional , caso o signed (que esteja verdadeiro ir para login caso não ir a tela de acesso)

*/
import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

function Routes(){
    const { signed, loading } = useContext(AuthContext);

    //Loading da tela de auth
    //case tenha loading executar a animação, caso não ir para o return
    if(loading){
        return(
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#131313" />
            </View>
        )
    }

    //Caso signed (caso é a variavel que tem a condicionalr (sim user e não !!user em auth))
    //se signed for verdadeiro ir para tela de acesso
    //caso não tela de acesso
    return(
        signed ? <AppRoutes/> : <AuthRoutes/>
    )
}
export default Routes;