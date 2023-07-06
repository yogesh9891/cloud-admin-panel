import axios from "axios"
import axiosInstance from "./axios.service"
import BaseUrl from './url.service'

const serverUrl = `${BaseUrl}/userRequirement`

export const getAllUserRequirements = async (query) => {
    return axiosInstance.get(`${serverUrl}/?${query}`)
}
