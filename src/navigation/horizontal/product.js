// ** Icons Import
import { ShoppingCart, Circle, List } from 'react-feather'

export default [
  {
    id: 'productGroup',
    title: 'Products',
    icon: <ShoppingCart />,
    roleArr: ["ADMIN", "DISTRIBUTER", "APPROVERS"],
    children: [
      {
        id: 'category',
        title: 'Category',
        icon: <List />,
        roleArr: ["ADMIN"],
        navLink: '/products/category'
      },
      {
        id: 'brand',
        title: 'Brand',
        icon: <List />,
        roleArr: ["ADMIN"],
        navLink: '/products/brands'
      },
      {
        id: 'product',
        title: 'Product',
        icon: <List />,
        roleArr: ["ADMIN", "DISTRIBUTER", "APPROVERS"],
        navLink: '/products/product-lists'
      }
    ]
  }
]
