// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllFlashSales, updateFlashSalebyId, getFlashSalebyId } from '../../../../services/FlashSales.service'
import { getAllLeads } from '../../../../services/leads.service'

// ** Axios Imports
import { toastError, toastSuccess } from '../../../../utility/toastutill'


export const getLeads = createAsyncThunk('Leads/getAllLeads', async params => {
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
  const response = await getAllLeads(query)
  console.log(response.data.data, "data")
  return {
    params,
    data: response.data.data,
    LeadsCount: response.data.totalPages
  }
})


export const LeadsSlice = createSlice({
  name: 'Leads',
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
      .addCase(getLeads.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.LeadsCount
      })
  }
})

export default LeadsSlice.reducer
