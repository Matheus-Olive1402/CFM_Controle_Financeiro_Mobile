/*
  tela de cadastro
*/
import React, {useState, useContext} from 'react';
import { Platform, ActivityIndicator,Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native';

import { AuthContext } from '../../contexts/auth';
import fonts from '../../Styles/fonts';

import { Background, Container, Logo, AreaInput, Input, SubmitButton, 
SubmitText} from '../SignIn/styles';

export default function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { signUp, loadingAuth} = useContext(AuthContext);

  function handleSignUp(){
    signUp(email, password, nome);
    Keyboard.dismiss();
  }
  
//touchable serve pra quando tocar fora sair da tela de texto
 return (
   <Background>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
        <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
        >   
          <AreaInput>
            <Input
            placeholder="Nome"
            autoCorrect={false}
            autoCapitalize="none"
            value={nome}
            onChangeText={ (text) => setNome(text) }
            />
          </AreaInput>    
          <AreaInput>
            <Input
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={ (text) => setEmail(text) }
            />
          </AreaInput>    
          <AreaInput>
            <Input
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            onChangeText={ (text) => setPassword(text) }
            secureTextEntry={true}
            />
          </AreaInput>

          <SubmitButton onPress={handleSignUp}>
            {
                loadingAuth ? (
                  <ActivityIndicator size={20} color="#FFF" />
                ) : (
                  <SubmitText>Cadastrar</SubmitText>
                )
            }
          </SubmitButton>
        </Container>
      </TouchableWithoutFeedback>
   </Background>
  );



}