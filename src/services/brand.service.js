import axiosInstance from './axios.service'
import BaseUrl from './url.service'
import axios from 'axios'

const serverUrl = `${BaseUrl}/brand`

export const addBrandApi = (formData) => {
  return axiosInstance.post(`${serverUrl}/`, formData)
}

export const getBrandApi = (query) => {
  return axiosInstance.get(`${serverUrl}/?${query}`)
}

export const getByIdApi = (id) => {
    return axiosInstance.get(`${serverUrl}/getById/${id}`)
  }

export const deleteBrandApi = (id) => {
  return axiosInstance.delete(`${serverUrl}/deleteById/${id}`)
}

export const updateBrandApi = (formData, id) => {
  return axiosInstance.patch(`${serverUrl}/updateById/${id}`, formData)
}

