// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { getDecodedToken, jwtConfig } from '../utility/jwt.util'

const initialUser = () => {
  const item = window.localStorage.getItem('userData')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {}
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser()
  },
  reducers: {
    handleLogin: (state, action) => {
      state[jwtConfig.storageTokenKeyName] = action.payload[jwtConfig.storageTokenKeyName]
      state[jwtConfig.storageRefreshTokenKeyName] = action.payload[jwtConfig.storageRefreshTokenKeyName]

      console.log(action.payload, "payload login", jwtConfig)
      localStorage.setItem(jwtConfig.storageTokenKeyName, action.payload.token)
      localStorage.setItem(jwtConfig.storageRefreshTokenKeyName, action.payload.refreshToken)
      const decodeUserData = getDecodedToken()
      console.log(decodeUserData, "decodeUserData")
      state.userData = decodeUserData
      localStorage.setItem('userData', JSON.stringify(decodeUserData))

    },
    handleLogout: state => {
      state.userData = {}
      state[jwtConfig.storageTokenKeyName] = null
      state[jwtConfig.storageRefreshTokenKeyName] = null
      // ** Remove user, accessToken & refreshToken from localStorage
      localStorage.removeItem('userData')
      localStorage.removeItem(jwtConfig.storageTokenKeyName)
      localStorage.removeItem(jwtConfig.storageRefreshTokenKeyName)
    }
  }
})

export const { handleLogin, handleLogout } = authSlice.actions

export default authSlice.reducer
