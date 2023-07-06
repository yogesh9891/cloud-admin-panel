import axios from "axios"
import { getRefreshToken, getToken, setRefreshToken, setToken } from "../utility/jwt.util"
import { toastError } from "../utility/toastutill"

const axiosInstance = axios.create()

const jwtConfig = {
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
// ** Add request/response interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = getToken()
    if (accessToken) {
      // ** eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `${jwtConfig.tokenType} ${accessToken}`
    }
    // config.headers['Content-Type'] = 'application/json';
    return config
  },
  error => {
    console.error(error)
    Promise.reject(error)
  })
axiosInstance.interceptors.response.use(
  (res) => {
    // Add configurations here
    return res
  },
  async (err) => {
    console.log("INterceptordddddddd error", err)
    const { config, response } = err
    const originalRequest = config
    const isAlreadyFetchingAccessToken = false
    if (response && response.status === 401) {
      if (!isAlreadyFetchingAccessToken) {
        console.log(response, "response refresh error")

        isAlreadyFetchingAccessToken = true
        try {
          const oldrefreshToken = getRefreshToken()

          const res = await refreshTokenApi({ refreshToken: oldrefreshToken })
          if (res.data && res.data.refreshToken) {
            //             // ** Update accessToken in localStorage
            setRefreshToken(res.data.refreshToken)
            setToken(res.data.token)
            const accessToken = res.data.token
            const retryOriginalRequest = new Promise(resolve => {
              originalRequest.headers.Authorization = `${jwtConfig.tokenType} ${accessToken}`
              resolve(axios(originalRequest))
            })
          }
        } catch (error2) {
          console.log("refresh Errpr=>", error2)
        }
      }
      toastError(err)

    }

    return Promise.reject(err)
  }
)
//  axiosInstance.interceptors.request.use(
//   config => {
//     // ** Get token from localStorage
//     const accessToken = getToken()

//     // ** If token is present add it to request's Authorization Header
//     if (accessToken) {
//       // ** eslint-disable-next-line no-param-reassign
//       config.headers.Authorization = `${jwtConfig.tokenType} ${accessToken}`
//     }
//     return config
//   },
//   error => {
//     if (error) { console.log("fdsafsdff", error) }
//     return Promise.reject(error)
//   }
// )


//    axiosInstance.interceptors.response.use(
//     response => response,
//     error => {
//       // ** const { config, response: { status } } = error
//       const { config, response } = error
//       const originalRequest = config

//       // ** if (status === 401) {
//       if (response && response.status === 401) {
//         if (!isAlreadyFetchingAccessToken) {
//           this.isAlreadyFetchingAccessToken = true
//           this.refreshToken().then(r => {
//             this.isAlreadyFetchingAccessToken = false

//             // ** Update accessToken in localStorage
//             this.setToken(r.data.accessToken)
//             this.setRefreshToken(r.data.refreshToken)

//             this.onAccessTokenFetched(r.data.accessToken)
//           })
//         }
//         const retryOriginalRequest = new Promise(resolve => {
//           this.addSubscriber(accessToken => {
//             // ** Make sure to assign accessToken according to your response.
//             // ** Check: https://pixinvent.ticksy.com/ticket/2413870
//             // ** Change Authorization header
//             originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
//             resolve(this.axios(originalRequest))
//           })
//         })
//         return retryOriginalRequest
//       }
//       return Promise.reject(error)
//     }
//   )

export default axiosInstance

