import jwt_decode from "jwt-decode"
// ** Auth Endpoints
export const jwtConfig =  {
    loginEndpoint: '/login',
    registerEndpoint: '/register',
    refreshEndpoint: '/refresh-token',
    logoutEndpoint: '/logout',
  
    // ** This will be prefixed in authorization header with token
    // ? e.g. Authorization: Bearer <token>
    tokenType: 'Bearer',
  
    // ** Value of this property will be used as key to store JWT token in storage
    storageTokenKeyName: 'AUTH_TOKEN',
    storageRefreshTokenKeyName: 'REFRESH_AUTH_TOKEN'
  }


  export const getToken = () => {
    return localStorage.getItem(jwtConfig.storageTokenKeyName)
  }

  export const getRefreshToken = () => {
    return localStorage.getItem(jwtConfig.storageRefreshTokenKeyName)
  }

  export const setToken = (value) => {
    localStorage.setItem(jwtConfig.storageTokenKeyName, value)
  }

  export const setRefreshToken = (value) => {
    localStorage.setItem(jwtConfig.storageRefreshTokenKeyName, value)
  }

  export const getDecodedToken = () => {
    const token = localStorage.getItem(jwtConfig.storageTokenKeyName)
    if (!token) {
        return 0
    }
    const decodedToken = jwt_decode(token)
    return decodedToken
}

//   export const refreshToken = () => {
//     return axios.post(jwtConfig.refreshEndpoint, {
//       refreshToken: getRefreshToken()
//     })
//   }