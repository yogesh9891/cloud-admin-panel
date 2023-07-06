// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { addUserApi, deleteUserById, editUserApi, getAllUsers, getUserById } from '../../../../services/user.service'
import { toastError, toastSuccess } from '../../../../utility/toastutill'

export const getAllData = createAsyncThunk('appUsers/getAllData', async () => {
  const response = await getAllUsers()
  return response.data.data
})

export const getData = createAsyncThunk('appUsers/getData', async params => {
  let query = ``
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
  if (params.role) {
    query = `${query}&role=${params.role}`
  }
  if (params.hasActiveSubsctipion) {
    query = `${query}&hasActiveSubsctipion=${params.hasActiveSubsctipion}`
  }
  if (params.status) {
    query = `${query}&status=${params.status}`
  }
  console.log(params.showName, "params.showName")
  if (params.showName) {
    query = `${query}&showName=${params.showName}`
  }


  const response = await getAllUsers(query)
  console.log(response.data, "resposen s")
  return {
    params,
    data: response.data.data,
    totalPages: response.data.totalCount,
    totalDistributors: response.data.totalDistributors,
    totalManufacturers: response.data.totalManufacturers,
    totalDealers: response.data.totalDealers,
    totalUsers: response.data.totalUsers
  }
})

export const getUser = createAsyncThunk('appUsers/getUser', async id => {
  try {

    if (!id) {
      return
    }
    const { data: res } = await getUserById(id)
    if (res.data) {
      toastSuccess(res.data.message)
    }
    return res.data
  } catch (error) {
    toastError(error)
    return error
  }
})

export const addUser = createAsyncThunk('appUsers/addUser', async (user, { dispatch, getState }) => {

  try {
    const res = await addUserApi(user)
    if (res.data) {
      toastSuccess(res.data.message)
      await dispatch(getData(getState().users.params))
      await dispatch(getAllData())
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    console.log(error, "saf")
    toastError(error)
    return error
  }

})
export const editUser = createAsyncThunk('appUsers/editUser', async (user, id, { dispatch, getState }) => {

  try {
    const res = await editUserApi(user, id)
    if (res.data) {
      toastSuccess(res.data.message)
      await dispatch(getData(getState().users.params))
      await dispatch(getAllData())
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    console.log(error, "saf")
    toastError(error)
    return error
  }

})

export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { dispatch, getState }) => {
  try {
    const res = await deleteUserById(id)
    if (res.data) {
      toastSuccess(res.data.message)
      await dispatch(getAllData())
    }

    return id
  } catch (error) {
    console.log(error, "saf")
    toastError(error)
    return error
  }

})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    totalUsers: 1,
    totalDistributors: 1,
    totalManufacturers: 1,
    totalDealers: 1,
    params: {},
    allData: [],
    selectedUser: null,
    success: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload

      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
        state.totalDistributors = action.payload.totalDistributors
        state.totalManufacturers = action.payload.totalManufacturers
        state.totalDealers = action.payload.totalDealers
        state.totalUsers = action.payload.totalUsers
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.success = action.payload
      })

  }
})

export default appUsersSlice.reducer
