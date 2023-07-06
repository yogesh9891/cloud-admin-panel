// ** Icons Import
import {
  Box,
  Mail,
  User,
  Circle,
  Shield,
  Calendar,
  FileText,
  CheckSquare,
  ShoppingCart,
  MessageSquare,
  Map,
  Command,
  Eye
} from 'react-feather'

export default [
  {
    id: 'apps',
    title: 'Apps',
    icon: <Box />,
    roleArr: ["ADMIN", "APPROVERS"],
    children: [
      {
        id: 'users',
        title: 'Users',
        icon: <User size={12} />,
        children: [
          {
            id: 'All Users',
            title: 'All Users',
            icon: <Circle />,
            navLink: '/apps/user/list',
            roleArr: ["ADMIN", "APPROVERS"]
          },
          {
            id: 'Users With subscription',
            title: 'Users With subscription',
            icon: <Circle />,
            navLink: '/apps/user/Users-With-Subscription',
            roleArr: ["ADMIN", "APPROVERS"]
          }
        ],
        roleArr: ["ADMIN", "APPROVERS"]

      },
      {
        id: 'location',
        title: 'Location',
        icon: <Map />,
        roleArr: ["ADMIN"],
        children: [
          {
            id: 'locationCountry',
            title: 'Country',
            icon: <Circle />,
            navLink: '/apps/location/country',
            roleArr: ["ADMIN"]
          },
          {
            id: 'locationState',
            title: 'State',
            icon: <Circle />,
            navLink: '/apps/location/state',
            roleArr: ["ADMIN"]
          },
          {
            id: 'locationCity',
            title: 'City',
            icon: <Circle />,
            navLink: '/apps/location/city',
            roleArr: ["ADMIN"]
          }
        ]
      }

      // {
      //   id: 'email',
      //   title: 'Email',
      //   icon: <Mail />,
      //   navLink: '/apps/email'
      // },
      // {
      //   id: 'chat',
      //   title: 'Chat',
      //   icon: <MessageSquare />,
      //   navLink: '/apps/chat'
      // },
      // {
      //   id: 'todo',
      //   title: 'Todo',
      //   icon: <CheckSquare />,
      //   navLink: '/apps/todo'
      // },
      // {
      //   id: 'calendar',
      //   title: 'Calendar',
      //   icon: <Calendar />,
      //   navLink: '/apps/calendar'
      // },
      // {
      //   id: 'kanban',
      //   title: 'Kanban',
      //   icon: <CheckSquare size={20} />,
      //   navLink: '/apps/kanban'
      // },
      // {
      //   id: 'invoiceApp',
      //   title: 'Invoice',
      //   icon: <FileText />,
      //   children: [
      //     {
      //       id: 'invoiceList',
      //       title: 'List',
      //       icon: <Circle />,
      //       navLink: '/apps/invoice/list'
      //     },
      //     {
      //       id: 'invoicePreview',
      //       title: 'Preview',
      //       icon: <Circle />,
      //       navLink: '/apps/invoice/preview'
      //     },
      //     {
      //       id: 'invoiceEdit',
      //       title: 'Edit',
      //       icon: <Circle />,
      //       navLink: '/apps/invoice/edit'
      //     },
      //     {
      //       id: 'invoiceAdd',
      //       title: 'Add',
      //       icon: <Circle />,
      //       navLink: '/apps/invoice/add'
      //     }
      //   ]
      // },
      // {
      //   id: 'roles-permissions',
      //   title: 'Roles & Permissions',
      //   icon: <Shield size={20} />,
      //   children: [
      //     {
      //       id: 'roles',
      //       title: 'Roles',
      //       icon: <Circle size={12} />,
      //       navLink: '/apps/roles'
      //     }
      //     {
      //       id: 'permissions',
      //       title: 'Permissions',
      //       icon: <Circle size={12} />,
      //       navLink: '/apps/permissions'
      //     }
      //   ]
      // }
      // {
      //   id: 'eCommerce',
      //   title: 'eCommerce',
      //   icon: <ShoppingCart />,
      //   children: [
      //     {
      //       id: 'shop',
      //       title: 'Shop',
      //       icon: <Circle />,
      //       navLink: '/apps/ecommerce/shop'
      //     },
      //     {
      //       id: 'detail',
      //       title: 'Details',
      //       icon: <Circle />,
      //       navLink: '/apps/ecommerce/product-detail'
      //     },
      //     {
      //       id: 'wishList',
      //       title: 'Wish List',
      //       icon: <Circle />,
      //       navLink: '/apps/ecommerce/wishlist'
      //     },
      //     {
      //       id: 'checkout',
      //       title: 'Checkout',
      //       icon: <Circle />,
      //       navLink: '/apps/ecommerce/checkout'
      //     }
      //   ]
      // },
      // {
      //   id: 'users',
      //   title: 'User',
      //   icon: <User />,
      //   children: [
      //     {
      //       id: 'list',
      //       title: 'List',
      //       icon: <Circle />,
      //       navLink: '/apps/user/list'
      //     },
      //     {
      //       id: 'view',
      //       title: 'View',
      //       icon: <Circle />,
      //       navLink: '/apps/user/view'
      //     }
      //   ]
      // }
    ]
  }

]
