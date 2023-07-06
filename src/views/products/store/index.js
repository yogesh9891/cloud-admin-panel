// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { addProductApi, deleteProductApi, getByIdApi, getProductApi, updateProductApi } from '../../../services/product.service'
import { toastError, toastSuccess } from '../../../utility/toastutill'

export const getAllProducts = createAsyncThunk('products/getAllProducts', async () => {
  try {
    const response = await getProductApi()
    if (response.data.success) {
      toastSuccess(response.data.message)
    }
    return response.data.data
  } catch (error) {
    toastError(error)
    return error
  }
})

export const getProduct = createAsyncThunk('products/getProduct', async params => {

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

  const response = await getProductApi(query)
  return {
    params,
    data: response.data.data,
    totalPages: response.data.totalElements
  }
})

export const getProductById = createAsyncThunk('products/getProductById', async id => {
  try {
    const response = await getByIdApi(id)
    toastSuccess(response.data.message)
    return response.data.data
  } catch (error) {
    toastError(error)
    return error
  }
})

export const addProduct = createAsyncThunk('products/addProduct', async (formData, { dispatch, getState }) => {

  try {
    const res = await addProductApi(formData)
    if (res.data) {
      toastSuccess(res.data.message)
      await dispatch(getProduct(getState()))
      await dispatch(getAllProducts())
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    toastError(error)
    return error
  }

})

export const updateProduct = createAsyncThunk('products/updateProduct', async (formData, { dispatch, getState }) => {

  try {
    const res = await updateProductApi(formData, formData.id)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getProduct(getState()))
      await dispatch(getAllProducts())
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    toastError(error)
    return error
  }

})

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, { dispatch, getState }) => {
  try {
    const res = await deleteProductApi(id)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getProduct(getState()))
      await dispatch(getAllProducts())
    }
    return id
  } catch (error) {
    toastError(error)
    return error
  }
})

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedProduct: null,
    success: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.success = action.payload
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.selectedProduct = null
      })
  }
})

export default productsSlice.reducer
