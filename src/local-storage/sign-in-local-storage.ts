// just example storage file
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SignInResponse } from "../models/cognito-sign-in-model";

const keys = {
    authResponse: 'authResponse'
}

const setAuthUser = async (response: SignInResponse) : Promise<void> => {
    const stringValue = JSON.stringify(response)
    await AsyncStorage.setItem(keys.authResponse, stringValue)
}

const getAuthUser = async () : Promise<SignInResponse | null> => {
    const stringValue = await AsyncStorage.getItem(keys.authResponse) as string

    if(stringValue === null)
        return null

    return JSON.parse(stringValue) as SignInResponse;
}

export { setAuthUser, getAuthUser }