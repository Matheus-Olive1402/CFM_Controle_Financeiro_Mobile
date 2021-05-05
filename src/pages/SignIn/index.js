import React, {useState, useContext} from 'react';
import { Platform, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';

import { Background, Container, Logo, AreaInput, Input, SubmitButton, 
SubmitText, Link, LinkText} from './styles';

export default function SignIn() {
  const navigation = useNavigation();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loadingAuth } = useContext(AuthContext);


  function handleLogin(){
    signIn(email, password);
    Keyboard.dismiss();
  }

 return (
   //Container para adptar para IOS
   //touchable serve pra quando tocar fora sair da tela de texto
   <Background>
     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      enabled
      >
        <Logo source={require('../../assets/Logo.png')}/>
        
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
      <SubmitButton onPress={handleLogin}>
        {
          loadingAuth ? (
            <ActivityIndicator size={20} color="#FFF" />
          ) : (
            <SubmitText>Acessar</SubmitText>
          )
        }
      </SubmitButton>

      <Link onPress={ () => navigation.navigate('SignUp')}>
        <LinkText>Criar uma conta!</LinkText>
      </Link>

      </Container>
    </TouchableWithoutFeedback>
   </Background>
  );
}