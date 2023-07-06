// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { addBrandApi, deleteBrandApi, getByIdApi, getBrandApi, updateBrandApi } from '../../../../services/brand.service'
import { toastError, toastSuccess } from '../../../../utility/toastutill'

export const getAllBrand = createAsyncThunk('productBrands/getAllBrand', async () => {
  try {
    const response = await getBrandApi()
    if (response.data.success) {
      toastSuccess(response.data.message)
    }
    return response.data.data
  } catch (error) {
    toastError(error)
    return []
  }
})

export const getBrand = createAsyncThunk('productBrands/getBrand', async params => {
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
    }

    const response = await getBrandApi(query)
    return {
      params,
      data: response.data.data,
      totalPages: response.data.brandCount
    }

  } catch (error) {
    toastError(error)
    return []
  }
})

export const getBrandById = createAsyncThunk('productBrands/getBrandById', async id => {
  try {
    const response = await getByIdApi(id)
    toastSuccess(response.data.message)
    return response.data.data
  } catch (error) {
    toastError(error)
    return {}
  }
})

export const addBrand = createAsyncThunk('productBrands/addBrand', async (formData, { dispatch, getState }) => {

  try {
    const res = await addBrandApi(formData)
    if (res.data) {
      toastSuccess(res.data.message)
      await dispatch(getBrand(getState()))
      await dispatch(getAllBrand())
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    toastError(error)
    return {}
  }

})

export const updateBrand = createAsyncThunk('productBrands/updateBrand', async (formData, { dispatch, getState }) => {

  try {
    const res = await updateBrandApi(formData, formData.id)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getBrand(getState()))
      await dispatch(getAllBrand())
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    toastError(error)
    return {}
  }

})

export const deleteBrand = createAsyncThunk('productBrands/deleteBrand', async (id, { dispatch, getState }) => {
  try {
    const res = await deleteBrandApi(id)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getBrand(getState()))
      await dispatch(getAllBrand())
    }
    return id
  } catch (error) {
    toastError(error)
    return {}
  }
})

export const productBrandsSlice = createSlice({
  name: 'productBrands',
  initialState: {
    brand: [],
    total: 1,
    params: {},
    brands: [],
    selectedBrand: null,
    success: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllBrand.fulfilled, (state, action) => {
        state.brands = action.payload
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.brand = action.payload.data
        state.brands = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getBrandById.fulfilled, (state, action) => {
        state.selectedBrand = action.payload
      })
      .addCase(addBrand.fulfilled, (state, action) => {
        state.success = action.payload
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.selectedBrand = null
      })
  }
})

export default productBrandsSlice.reducer
