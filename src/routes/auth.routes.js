import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Startup from '../pages/Startup';

const AuthStack = createStackNavigator();

function AuthRoutes(){
    return(
    <AuthStack.Navigator>
        <AuthStack.Screen 
        name="Startup"
        component={Startup}
        options={{headerShown: false}}
        />
        <AuthStack.Screen 
        name="SignIn" 
        component={SignIn}
        options={{headerShown: false}}
        />
        
        <AuthStack.Screen 
        name="SignUp" 
        component={SignUp}
        options={{
            headerStyle:{
                backgroundColor: '#131313',
                borderBottomWidth: 1,
                borderBottomColor: '#00b94a'
            },
            headerTintColor: '#FFF',
            headerBackTitleVisible: false,
            headerTitle: 'Voltar'
        }}
        />
    </AuthStack.Navigator>
    //o ultimo screen se refere a tela de cadastro a parte de cima fixa
    
    );
}

export default AuthRoutes;
