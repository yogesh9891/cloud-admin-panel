// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllPromotions } from '../../../../services/promotions.service'

// ** Axios Imports


export const getPromotions = createAsyncThunk('Promotions/GetPromotions', async params => {
  let query = ``
  if (params) {
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
  const response = await getAllPromotions(query)
  return {
    params,
    data: response.data.data,
    promotionCount: response.data.AdvertisementsubscriptionCount
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


export const PromotionsSlice = createSlice({
  name: 'promotions',
  initialState: {
    data: [],
    params: {},
    allData: [],
    selectedPromotions: null,
    success: false
  },
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(getPromotions.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.promotionCount
      })
      .addCase(getFlashSalesById.fulfilled, (state, action) => {
        state.selectedPromotions = action.payload
      })

  }
})

export default PromotionsSlice.reducer
