// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllFlashSales, updateFlashSalebyId, getFlashSalebyId } from '../../../../services/FlashSales.service'

// ** Axios Imports
import { toastError, toastSuccess } from '../../../../utility/toastutill'


export const getFlashSales = createAsyncThunk('FlashSales/getFlashSales', async params => {
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
  const response = await getAllFlashSales(query)
  return {
    params,
    data: response.data.data,
    FlashSalesCount: response.data.totalPages
  }
})

export const getFlashSalesById = createAsyncThunk('FlashSales/getFlashSalesById', async id => {
  try {
    const response = await getFlashSalebyId(id)
    toastSuccess(response.data.message)
    return response.data.data
  } catch (error) {
    toastError(error)
    return error
  }
})


export const updateFlashSales = createAsyncThunk('FlashSales/updateFlashSales', async (id, params) => {
  try {
    const response = await updateFlashSalebyId(id, params)
    toastSuccess(response.data.message)
    return response.data.data
  } catch (error) {
    toastError(error)
    return error
  }
})


export const FlashSalesSlice = createSlice({
  name: 'FlashSales',
  initialState: {
    data: [],
    params: {},
    allData: [],
    selectedFlashSales: null,
    success: false
  },
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(getFlashSales.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.FlashSalesCount
      })
      .addCase(getFlashSalesById.fulfilled, (state, action) => {
        state.selectedFlashSales = action.payload
      })
      .addCase(updateFlashSales.fulfilled, (state, action) => {
        state.selectedFlashSales = null
      })
  }
})

export default FlashSalesSlice.reducer
