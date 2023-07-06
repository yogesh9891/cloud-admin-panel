import axiosInstance from './axios.service'
import BaseUrl from './url.service'
import axios from 'axios'

const serverUrl = `${BaseUrl}/advertisementSubscription`

export const addadvertisementSubscriptionApi = (formData) => {
    return axiosInstance.post(`${serverUrl}`, formData)
}

export const getAdvertisementSubscriptionApi = (query) => {
    return axiosInstance.get(`${serverUrl}?${query}`)
}

export const getByIdApi = (id) => {
    return axiosInstance.get(`${serverUrl}/getById/${id}`)
}

export const deleteAdvertisementSubscriptionApi = (id) => {
    return axiosInstance.delete(`${serverUrl}/deleteById/${id}`)
}

export const updateAdvertisementSubscriptionApi = (formData, id) => {
    return axiosInstance.patch(`${serverUrl}/updateById/${id}`, formData)
}

