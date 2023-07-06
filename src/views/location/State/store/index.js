// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { addStateApi, deleteStateApi, getByIdApi, getStateApi, updateStateApi } from '../../../../services/state.service'
import { toastError, toastSuccess } from '../../../../utility/toastutill'

export const getAllState = createAsyncThunk('state/getAllState', async (query) => {
  try {
    const response = await getStateApi(query)
    if (response.data.success) {
      toastSuccess(response.data.message)
    }
    return response.data.data
  } catch (error) {
    toastError(error)
    return []
  }
})

export const getState = createAsyncThunk('states/getState', async params => {
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

    }
    const response = await getStateApi(query)
    return {
      params,
      data: response.data.data,
      totalPages: response.data.totalPages
    }

  } catch (error) {
    toastError(error)
    return []
  }
})

export const getStateById = createAsyncThunk('states/getStateById', async id => {
  try {
    const response = await getByIdApi(id)
    toastSuccess(response.data.message)
    return response.data.data
  } catch (error) {
    toastError(error)
    return {}
  }
})

export const addState = createAsyncThunk('states/addState', async (formData, { dispatch, getState }) => {

  try {
    const res = await addStateApi(formData)
    if (res.data) {
      toastSuccess(res.data.message)
      await dispatch(getAllState())
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    toastError(error)
    return {}
  }

})

export const updateState = createAsyncThunk('states/updateState', async (formData, { dispatch, getState }) => {

  try {
    const res = await updateStateApi(formData, formData.id)
    if (res.data.success) {
      toastSuccess(res.data.message)
      // await dispatch(getState(getState()))
      await dispatch(getAllState())
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    toastError(error)
    return {}
  }

})

export const deleteState = createAsyncThunk('states/deleteState', async (id, { dispatch, getState }) => {
  try {
    const res = await deleteStateApi(id)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getState(getState()))
      await dispatch(getAllState())
    }
    return id
  } catch (error) {
    toastError(error)
    return {}
  }
})

export const statesSlice = createSlice({
  name: 'states',
  initialState: {
    states: [],
    total: 1,
    params: {},
    states: [],
    selectedState: null,
    success: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllState.fulfilled, (state, action) => {
        state.states = action.payload
      })
      .addCase(getState.fulfilled, (state, action) => {
        state.states = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getStateById.fulfilled, (state, action) => {
        state.selectedState = action.payload
      })
      .addCase(addState.fulfilled, (state, action) => {
        state.success = action.payload
      })
      .addCase(updateState.fulfilled, (state, action) => {
        state.selectedState = null
      })
  }
})

export default statesSlice.reducer
