import axiosInstance from './axios.service'
import BaseUrl from './url.service'
import axios from 'axios'

const serverUrl = `${BaseUrl}/country`

export const addCountryApi = (formData) => {
  return axiosInstance.post(`${serverUrl}/`, formData)
}

export const getCountryApi = (query) => {
  console.log(query, "country Query")
  return axiosInstance.get(`${serverUrl}/?${query}`)
}

export const getByIdApi = (id) => {
  return axiosInstance.get(`${serverUrl}/getById/${id}`)
}

export const deleteCountryApi = (id) => {
  return axiosInstance.delete(`${serverUrl}/deleteById/${id}`)
}

export const updateCountryApi = (formData, id) => {
  return axiosInstance.patch(`${serverUrl}/updateById/${id}`, formData)
}

