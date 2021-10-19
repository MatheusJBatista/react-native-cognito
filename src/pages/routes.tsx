import React from 'react'
import { Button, Text } from 'react-native'
import { useCognitoContext, withAuthentication } from '../provider/cognito-provider'

const Routes = () => {
    const { signOut } = useCognitoContext()

  return (
    <>
        <Text>Olá mundo</Text>
        <Button title="SignOut" onPress={signOut}/>
    </>
  )
}

export default withAuthentication(Routes)