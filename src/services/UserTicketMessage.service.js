import axios from "axios"
import axiosInstance from "./axios.service"

import BaseUrl from './url.service'

const serverUrl = `${BaseUrl}/userTicketMessage`

export const AddTicketMessage = async (obj) => {
    return axiosInstance.post(`${serverUrl}/`, obj)
}

export const getTicketMessagesbyId = async (id) => {
    return axiosInstance.get(`${serverUrl}/getTicketMessage/${id}`)
}
