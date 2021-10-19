import React, { useState } from 'react'
import { StyleSheet, Text, View  } from 'react-native'
import Amplify from 'aws-amplify'

import AwsExports from '../../aws-exports'
import Button from '../components/button'
import TextInput from '../components/text-input'
import { useCognitoContext } from '../provider/cognito-provider'

Amplify.configure(AwsExports)

const SignIn = () => {
  const cognitoContext = useCognitoContext()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const login = async () => {
    await cognitoContext?.signIn(username, password)
  }

  return (
    <View>
      <Text style={styles.text}>Login</Text>
      
      {cognitoContext?.signUpFail && <Text style={styles.failText}>Falha ao autenticar</Text>}

      <TextInput label="Usuario" value={username} onChangeText={setUsername}/>
      <TextInput label="Senha" value={password} onChangeText={setPassword}/>

      <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>

      <Button 
        name={cognitoContext?.isLoadingSignIn ? 'Carregando...' : 'Login'} 
        disabled={cognitoContext?.isLoadingSignIn as boolean}
        onPress={login}/>
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 50
    },
    forgotPasswordText: {
      margin: 10,
      color: 'blue'
    },
    failText: {
      color: 'red',
      margin: 10,
      fontSize: 20
    }
  });
  

export default SignIn