// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { addCountryApi, deleteCountryApi, getByIdApi, getCountryApi, updateCountryApi } from '../../../../services/country.service'
import { toastError, toastSuccess } from '../../../../utility/toastutill'

export const getAllCountry = createAsyncThunk('productCountrys/getAllCountry', async (params) => {
  try {
    const response = await getCountryApi()
    return response.data.data
  } catch (error) {
    toastError(error)
    return []
  }
})

export const getCountry = createAsyncThunk('productCountrys/getCountry', async params => {
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

    }
    const response = await getCountryApi(query)
    return {
      params,
      data: response.data.data,
      totalPages: response.data.countryCount
    }

  } catch (error) {
    toastError(error)
    return []
  }
})

export const getCountryById = createAsyncThunk('productCountrys/getCountryById', async id => {
  try {
    const response = await getByIdApi(id)
    toastSuccess(response.data.message)
    return response.data.data
  } catch (error) {
    toastError(error)
    return {}
  }
})

export const addCountry = createAsyncThunk('productCountrys/addCountry', async (formData, { dispatch, getState }) => {
  const categoryState = getState().countries.params

  try {
    const res = await addCountryApi(formData)
    if (res.data) {
      toastSuccess(res.data.message)
      await dispatch(getCountry(categoryState))
      await dispatch(getAllCountry(categoryState))
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    toastError(error)
    return {}
  }

})

export const updateCountry = createAsyncThunk('productCountrys/updateCountry', async (formData, { dispatch, getState }) => {
  const categoryState = getState().countries.params

  try {
    const res = await updateCountryApi(formData, formData.id)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getCountry(categoryState))
      await dispatch(getAllCountry(categoryState))
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    toastError(error)
    return {}
  }

})

export const deleteCountry = createAsyncThunk('productCountrys/deleteCountry', async (id, { dispatch, getState }) => {
  try {
    const categoryState = getState().countries.params

    const res = await deleteCountryApi(id)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getCountry(categoryState))
      await dispatch(getAllCountry(categoryState))
    }
    return id
  } catch (error) {
    toastError(error)
    return {}
  }
})

export const countrysSlice = createSlice({
  name: 'productCountrys',
  initialState: {
    country: [],
    total: 1,
    params: {},
    countries: [],
    selectedCountry: null,
    success: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllCountry.fulfilled, (state, action) => {
        state.countries = action.payload
      })
      .addCase(getCountry.fulfilled, (state, action) => {
        state.country = action.payload.data
        state.params = action?.payload?.params
        state.total = action.payload.totalPages
      })
      .addCase(getCountryById.fulfilled, (state, action) => {
        state.selectedCountry = action.payload
      })
      .addCase(addCountry.fulfilled, (state, action) => {
        state.success = action.payload
      })
      .addCase(updateCountry.fulfilled, (state, action) => {
        state.selectedCountry = null
      })
  }
})

export default countrysSlice.reducer
