import React, { lazy, Suspense } from 'react'
import { Text } from 'react-native'
import Routes from './pages/routes'

import CognitoProvider from './provider/cognito-provider'

const App = () => {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <CognitoProvider>
        <Routes/>
      </CognitoProvider>
    </Suspense>
  )
}

export default App