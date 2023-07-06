import axiosInstance from './axios.service'
import BaseUrl from './url.service'
import axios from 'axios'

const serverUrl = `${BaseUrl}/city`

export const addCityApi = (formData) => {
  return axiosInstance.post(`${serverUrl}/`, formData)
}

export const getCityApi = (query) => {
  return axiosInstance.get(`${serverUrl}/?${query}`)
}

export const getByIdApi = (id) => {
    return axiosInstance.get(`${serverUrl}/getById/${id}`)
  }

export const deleteCityApi = (id) => {
  return axiosInstance.delete(`${serverUrl}/deleteById/${id}`)
}

export const updateCityApi = (formData, id) => {
  return axiosInstance.patch(`${serverUrl}/updateById/${id}`, formData)
}

