import axiosInstance from './axios.service'
import BaseUrl from './url.service'
import axios from 'axios'

const serverUrl = `${BaseUrl}/category`

export const addCategoryApi = (formData) => {
  return axiosInstance.post(`${serverUrl}/addCategory`, formData)
}

export const getCategoryApi = (query) => {
  return axiosInstance.get(`${serverUrl}/getCategory?${query}`)
}

export const getByIdApi = (id) => {
    return axiosInstance.get(`${serverUrl}/getById/${id}`)
  }

export const deleteCategoryApi = (id) => {
  return axiosInstance.delete(`${serverUrl}/deleteById/${id}`)
}

export const updateCategoryApi = (formData, id) => {
  return axiosInstance.patch(`${serverUrl}/updateById/${id}`, formData)
}

export const getNestedCategoriesApi = () => {
  return axiosInstance.get(`${serverUrl}/getNestedCategories`)
}

export const saveCategorypositionApi = (id, formData) => {
  return axiosInstance.post(`${serverUrl}/saveCategoryposition`, formData)
}
