// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { addSubscriptionApi, deleteSubscriptionApi, getByIdApi, getSubscriptionApi, updateSubscriptionApi } from '../../../services/subscription.service'
import { toastError, toastSuccess } from '../../../utility/toastutill'


export const getSubscription = createAsyncThunk('Subscription/getSubscription', async params => {
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
  const response = await getSubscriptionApi(query)
  return {
    params,
    data: response.data.data,
    subscriptionCount: response.data.subscriptionCount
  }
})

export const getSubscriptionById = createAsyncThunk('Subscription/getSubscriptionById', async id => {
  try {
    const response = await getByIdApi(id)
    toastSuccess(response.data.message)
    return response.data.data
  } catch (error) {
    toastError(error)
    return error
  }
})

export const addSubscription = createAsyncThunk('Subscription/addSubscription', async (formData, { dispatch }) => {

  try {
    const res = await addSubscriptionApi(formData)
    if (res.data) {
      toastSuccess(res.data.message)
      await dispatch(getSubscription())
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    toastError(error)
    return error
  }

})

export const updateSubscription = createAsyncThunk('Subscription/updateSubscription', async (formData, { dispatch }) => {

  try {
    const res = await updateSubscriptionApi(formData, formData.id)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getSubscription())
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    toastError(error)
    return error
  }

})

export const deleteSubscription = createAsyncThunk('Subscription/deleteSubscription', async (id, { dispatch }) => {
  try {
    const res = await deleteSubscriptionApi(id)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getSubscription())
    }
    return id
  } catch (error) {
    toastError(error)
    return error
  }
})

export const SubscriptionSlice = createSlice({
  name: 'Subscription',
  initialState: {
    data: [],
    params: {},
    allData: [],
    selectedSubscription: null,
    success: false
  },
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(getSubscription.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.subscriptionCount
      })
      .addCase(getSubscriptionById.fulfilled, (state, action) => {
        state.selectedSubscription = action.payload
      })
      .addCase(addSubscription.fulfilled, (state, action) => {
        state.success = action.payload
      })
      .addCase(updateSubscription.fulfilled, (state, action) => {
        state.selectedSubscription = null
      })
  }
})

export default SubscriptionSlice.reducer
