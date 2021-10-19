import React, { createContext, useContext, useEffect, useState } from 'react'
import Amplify, { Auth } from 'aws-amplify'
import AwsExports from '../../aws-exports'

import {SignInResponse} from '../models/cognito-sign-in-model'
import { Text } from 'react-native'
import SignIn from '../pages/sign-in'

interface CognitoContextProps {
    Auth: typeof Auth,
    signIn(username: string, password: string): Promise<SignInResponse>,
    signOut(): Promise<void>,
    authResponse: SignInResponse | null,
    isLoadingAuthUser: boolean,
    isLoadingSignIn: boolean,
    signUpFail: boolean
}

const CognitoContext = createContext<CognitoContextProps | null>(null)

Amplify.configure(AwsExports)

const CognitoProvider: React.FC<{ children: any }> = ({ children }) => {
    const [authResponse, setAuthResponse] = useState<SignInResponse | null>(null)
    const [isLoadingAuthUser, setIsLoadingAuthUser] = useState<boolean>(true)
    const [isLoadingSignIn, setIsLoadingSignIn] = useState<boolean>(false)
    const [signUpFail, setSignUpFail] = useState<boolean>(false)

    const signIn = async (username: string, password: string): Promise<SignInResponse> => {
        setIsLoadingSignIn(true)
        setSignUpFail(false)
        const response = await Auth.signIn({
            password,
            username
        })
        .catch(() => setSignUpFail(true))
        .finally(() => setIsLoadingSignIn(false)) as SignInResponse

        setAuthResponse(response)

        return response
    }

    const signOut = async (): Promise<void> => {
        await Auth.signOut()
            .then(() => setAuthResponse(null))
    }

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then(setAuthResponse)
            .finally(() => setIsLoadingAuthUser(false))
    }, [])

    return (
        <CognitoContext.Provider
            value={{
                Auth, 
                signIn, 
                authResponse, 
                isLoadingAuthUser, 
                signOut, 
                isLoadingSignIn,
                signUpFail
            }}>
            {isLoadingAuthUser ? <Text>Loading...</Text> : children}
        </CognitoContext.Provider>
    )
}

const useCognitoContext = () => {
    const context = useContext(CognitoContext)

    return context
}

const withAuthentication = (Component: React.FC):React.FC<any> => {
    return () => {
        const { isLoadingAuthUser, authResponse } = useCognitoContext() as CognitoContextProps

        if(isLoadingAuthUser)
            return <Text>Loading...</Text>
    
        if(!isLoadingAuthUser && authResponse)
            return <Component/>

        if(!authResponse)
            return <SignIn />

        return null
    }
}

export { useCognitoContext, withAuthentication }
export default CognitoProvider