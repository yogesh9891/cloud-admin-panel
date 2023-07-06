// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { addCategoryApi, deleteCategoryApi, getByIdApi, getCategoryApi, updateCategoryApi } from '../../../../services/category.service'
import { toastError, toastSuccess } from '../../../../utility/toastutill'

export const getAllData = createAsyncThunk('productCategories/getAllData', async () => {
  try {
    const response = await getCategoryApi()
    if (response.data.success) {
      toastSuccess(response.data.message)
    }
    return response.data.data
  } catch (error) {
    toastError(error)
    return error
  }
})

export const getData = createAsyncThunk('productCategories/getData', async params => {

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

  const response = await getCategoryApi(query)
  // console.log(res.data.count, res.data, "categoryCount")
  return {
    params,
    data: response.data.data,
    totalPages: response.data.count
  }
})

export const getCategory = createAsyncThunk('productCategories/getCategory', async id => {
  try {
    const response = await getByIdApi(id)
    toastSuccess(response.data.message)
    return response.data.data
  } catch (error) {
    toastError(error)
    return error
  }
})

export const addCategory = createAsyncThunk('productCategories/addCategory', async (formData, { dispatch, getState }) => {

  try {
    const res = await addCategoryApi(formData)
    if (res.data) {
      toastSuccess(res.data.message)
      await dispatch(getData(getState()))
      await dispatch(getAllData())
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    toastError(error)
    return error
  }

})

export const updateCategory = createAsyncThunk('productCategories/updateCategory', async (formData, { dispatch, getState }) => {

  try {
    const res = await updateCategoryApi(formData, formData.id)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getData(getState()))
      await dispatch(getAllData())
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    toastError(error)
    return error
  }

})

export const deleteCategory = createAsyncThunk('productCategories/deleteCategory', async (id, { dispatch, getState }) => {
  try {
    const res = await deleteCategoryApi(id)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getData(getState()))
      await dispatch(getAllData())
    }
    return id
  } catch (error) {
    toastError(error)
    return error
  }
})

export const productCategoriesSlice = createSlice({
  name: 'productCategories',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedCategory: null,
    success: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(getData.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.selectedCategory = action.payload
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.success = action.payload
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.selectedCategory = null
      })
  }
})

export default productCategoriesSlice.reducer
