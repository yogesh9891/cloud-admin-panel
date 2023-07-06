import axios from "axios"
import axiosInstance from "./axios.service"
import BaseUrl from './url.service'

const serverUrl = `${BaseUrl}/usersubscription`

export const buySubscription = async (obj) => {
    return axiosInstance.post(`${serverUrl}/buySubscription`, obj)
}

export const getAllSubscriptionbyUserId = async (id) => {
    return axiosInstance.get(`${serverUrl}/getAllSubscriptionbyUserId/?${id}`)
}
export const getSubscriptionSubscribedbyUserId = async (query, id) => {
    return axiosInstance.get(`${serverUrl}/getSubscriptionSubscribedbyUserId/${id}?${query}`)
}