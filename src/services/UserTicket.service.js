import axios from "axios"
import axiosInstance from "./axios.service"
import BaseUrl from './url.service'

const serverUrl = `${BaseUrl}/userTicket`

export const createTicket = async (obj) => {
    return axiosInstance.post(`${serverUrl}/`, obj)
}

export const getTicketsbyUserId = async (query) => {
    return axiosInstance.get(`${serverUrl}/?${query}`)
}
