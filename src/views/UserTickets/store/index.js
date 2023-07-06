// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { updateFlashSalebyId } from '../../../services/FlashSales.service'
import { getTicketsbyUserId } from '../../../services/UserTicket.service'
import { AddTicketMessage, getTicketMessagesbyId } from '../../../services/UserTicketMessage.service'

// ** Axios Imports
import { toastError, toastSuccess } from '../../../utility/toastutill'


export const getTickets = createAsyncThunk('tickets/getTickets', async params => {
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
  const response = await getTicketsbyUserId(query)
  return {
    params,
    data: response.data.data,
    ticketsCount: response.data.totalElements
  }
})

export const getTicketMessagesById = createAsyncThunk('tickets/getTicketMessagesById', async id => {
  try {
    const response = await getTicketMessagesbyId(id)
    toastSuccess(response.data.message)
    return response.data.data
  } catch (error) {
    toastError(error)
    return error
  }
})


export const addTicketMessage = createAsyncThunk('tickets/addTicketMessage', async (params) => {
  try {
    const response = await AddTicketMessage(params)
    toastSuccess(response.data.message)
    return response.data.data
  } catch (error) {
    toastError(error)
    return error
  }
})


export const TicketSlice = createSlice({
  name: 'Tickets',
  initialState: {
    data: [],
    params: {},
    allData: [],
    success: false
  },
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(getTickets.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.ticketsCount
      })
      .addCase(getTicketMessagesById.fulfilled, (state, action) => {
        state.selectedFlashSales = action.payload
      })
      .addCase(addTicketMessage.fulfilled, (state, action) => {
        // state.selectedFlashSales = null
      })
  }
})

export default TicketSlice.reducer
