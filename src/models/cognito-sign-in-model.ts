interface Attributes {
    email: string,
    "email_verified": string,
    "phone_number": string,
    "phone_number_verified": boolean,
    sub: string
}

interface Token {
    jwtToken: string,
    payload: Array<any>
}

interface SignInUserSession {
    accessToken: Token,
    idToken: Token,
    refreshToken: {
        token: string
    }
}

interface SignInResponse {
    attributes: Attributes,
    signInUserSession: SignInUserSession
}

export { Attributes, Token, SignInUserSession, SignInResponse }