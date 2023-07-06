import axiosInstance from './axios.service'
import BaseUrl from "./url.service"

const serverUrl = `${BaseUrl}/flashSales`


export const getAllFlashSales = async (query) => {
    return axiosInstance.get(`${serverUrl}/getFlashSales?${query}`)
}

export const getFlashSalebyId = async (id) => {
    return axiosInstance.get(`${serverUrl}/getById/${id}`)
}

export const updateFlashSalebyId = async (id, obj) => {
    return axiosInstance.patch(`${serverUrl}/updateById/${id}`, obj)
}