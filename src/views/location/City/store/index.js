// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { addCityApi, deleteCityApi, getByIdApi, getCityApi, updateCityApi } from '../../../../services/city.service'
import { toastError, toastSuccess } from '../../../../utility/toastutill'

export const getAllCity = createAsyncThunk('cities/getAllCity', async (query) => {
  try {
    const response = await getCityApi(query)
    if (response.data.success) {
      toastSuccess(response.data.message)
    }
    return response.data.data
  } catch (error) {
    toastError(error)
    return []
  }
})

export const getCity = createAsyncThunk('cities/getCity', async params => {
  try {
    let query = ``
    if (params) {
      if (params.sort) {
        query = `sort=${params.sort}`
      }
      if (params.sortColumn) {
        query = `${query}&sortColumn=${params.sortColumn}`
      }
      if (params.q) {
        query = `${query}&q=${params.q}`
      }
      if (params.perPage) {
        query = `${query}&perPage=${params.perPage}`
      }
      if (params.page) {
        query = `${query}&page=${params.page}`
      }
      if (params.status) {
        query = `${query}&status=${params.status}`
      }
      if (params.countryId && params.countryId !== "") {
        query = `${query}&countryId=${params.countryId}`
      }
      if (params.stateId && params.stateId !== "") {
        query = `${query}&stateId=${params.stateId}`
      }

    }
    const response = await getCityApi(query)
    return {
      params,
      data: response.data.data,
      totalPages: response.data.cityCount
    }

  } catch (error) {
    toastError(error)
    return []
  }
})

export const getCityById = createAsyncThunk('cities/getCityById', async id => {
  try {
    const response = await getByIdApi(id)
    toastSuccess(response.data.message)
    return response.data.data
  } catch (error) {
    toastError(error)
    return {}
  }
})

export const addCity = createAsyncThunk('cities/addCity', async (formData, { dispatch, getState }) => {

  try {
    const res = await addCityApi(formData)
    if (res.data) {
      toastSuccess(res.data.message)
      await dispatch(getAllCity())
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    toastError(error)
    return {}
  }

})

export const updateCity = createAsyncThunk('cities/updateCity', async (formData, { dispatch, getState }) => {

  try {
    const res = await updateCityApi(formData, formData.id)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getAllCity())
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    toastError(error)
    return {}
  }

})

export const deleteCity = createAsyncThunk('cities/deleteCity', async (id, { dispatch, getState }) => {
  try {
    const res = await deleteCityApi(id)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getAllCity())
    }
    return id
  } catch (error) {
    toastError(error)
    return {}
  }
})

export const citiesSlice = createSlice({
  name: 'cities',
  initialState: {
    cities: [],
    total: 1,
    params: {},
    citys: [],
    selectedCity: null,
    success: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllCity.fulfilled, (state, action) => {
        state.cities = action.payload
      })
      .addCase(getCity.fulfilled, (state, action) => {
        state.cities = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getCityById.fulfilled, (state, action) => {
        state.selectedCity = action.payload
      })
      .addCase(addCity.fulfilled, (state, action) => {
        state.success = action.payload
      })
      .addCase(updateCity.fulfilled, (state, action) => {
        state.selectedCity = null
      })
  }
})

export default citiesSlice.reducer
