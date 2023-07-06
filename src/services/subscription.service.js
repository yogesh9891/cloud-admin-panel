import axiosInstance from './axios.service'
import BaseUrl from './url.service'
import axios from 'axios'

const serverUrl = `${BaseUrl}/subscription`

export const addSubscriptionApi = (formData) => {
    return axiosInstance.post(`${serverUrl}`, formData)
}

export const getSubscriptionApi = (query) => {
    return axiosInstance.get(`${serverUrl}?${query}`)
}

export const getSubscriptionWithSubscriberCountApi = (query) => {
    return axiosInstance.get(`${serverUrl}/getSubscriptionWithSubscriberCountApi?${query}`)
}

export const getByIdApi = (id) => {
    return axiosInstance.get(`${serverUrl}/getById/${id}`)
}

export const deleteSubscriptionApi = (id) => {
    return axiosInstance.delete(`${serverUrl}/deleteById/${id}`)
}

export const updateSubscriptionApi = (formData, id) => {
    return axiosInstance.patch(`${serverUrl}/updateById/${id}`, formData)
}

