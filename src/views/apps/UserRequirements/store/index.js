// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import { getAllUsersWithSubsciption } from '../../../../services/user.service'
import { toastError } from '../../../../utility/toastutill'
import { getAllUserRequirements } from '../../../../services/UserRequirements.service'

export const getAllUserRequirement = createAsyncThunk('appUsers/getAllUserRequirement', async params => {
  try {
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
    const response = await getAllUserRequirements(query)
    return {
      params,
      data: response.data.data,
      totalPages: response.data.totalCounts
    }
  } catch (err) {
    toastError(err)
  }
})

export const userRequirementSlice = createSlice({
  name: 'userRequirement',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: null,
    success: false
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllUserRequirement.fulfilled, (state, action) => {
      state.data = action?.payload?.data
      state.total = action?.payload?.totalPages
    })
  }
})

export default userRequirementSlice.reducer
