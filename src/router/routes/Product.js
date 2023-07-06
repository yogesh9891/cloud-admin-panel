import { lazy } from 'react'
import BrandList from '../../views/products/brand/list'
import AddProduct from '../../views/products/list/AddProduct'
const CategoryList = lazy(() => import('../../views/products/category/list'))
const ProductList = lazy(() => import('../../views/products/list'))


const ProductRoutes = [
  {
    path: '/products/category',
    element: <CategoryList />,
    roleArr: ["ADMIN", "DISTRIBUTER"]
  },
  {
    path: '/products/product-lists',
    element: <ProductList />,
    roleArr: ["ADMIN", "DISTRIBUTER"]
  },
  {
    path: '/products/brands',
    element: <BrandList />,
    roleArr: ["ADMIN", "DISTRIBUTER"]
  },
  {
    path: 'products/add-products',
    element: <AddProduct />,
    roleArr: ["ADMIN", "DISTRIBUTER"]
  },
  {
    path: 'products/edit-product/:id',
    element: <AddProduct />,
    roleArr: ["ADMIN", "DISTRIBUTER"]
  }

]

export default ProductRoutes
