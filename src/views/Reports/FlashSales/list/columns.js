// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
// import { getProduct, deleteProduct } from '../store'

// ** Icons Imports
import { Database, Edit2, Eye, Settings, Slack, User } from 'react-feather'

// ** Reactstrap Imports
import moment from 'moment'
import { updateProductApi } from '../../../../services/product.service'
import { toastError, toastSuccess } from '../../../../utility/toastutill'

// ** Renders Client Columns
const renderClient = row => {
  if (row.avatar.length) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={row.avatarColor || 'light-primary'}
        content={row.fullName || 'John Doe'}
      />
    )
  }
}

const handleStatus = async (id, status) => {
  try {

    status = status === "PENDING" ? "APPROVED" : "PENDING"
    const obj = {
      approved: status
    }
    const { data: res } = await updateProductApi(obj, id)
    if (res.message) {
      toastSuccess(res.message)
    }
  } catch (error) {
    toastError(error)
  }
}

// ** Renders Role Columns
const renderRole = row => {
  const roleObj = {
    subscriber: {
      class: 'text-primary',
      icon: User
    },
    maintainer: {
      class: 'text-success',
      icon: Database
    },
    editor: {
      class: 'text-info',
      icon: Edit2
    },
    author: {
      class: 'text-warning',
      icon: Settings
    },
    admin: {
      class: 'text-danger',
      icon: Slack
    }
  }

  const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <Icon size={18} className={`${roleObj[row.role] ? roleObj[row.role].class : ''} me-50`} />
      {row.role}
    </span>
  )
}

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
}

export const columns = [
  {
    name: 'S.no',
    sortable: false,
    sortField: 'index',
    width: "5.6%",
    cell: (row, index) => (index + 1)
  },
  {
    name: 'Owner Name',
    sortable: false,
    sortField: 'name',
    width: "15%",
    cell: row => row?.userId?.name
  },
  {
    name: 'Product Name',
    sortable: false,
    sortField: 'name',
    width: "25%",
    cell: row => row?.productId?.name
  },
  {
    name: 'Discount Type',
    sortable: false,
    sortField: 'discounttype',
    // width: "25%",
    cell: row => row?.discountType
  },
  {
    name: 'Discount Value',
    sortable: false,
    sortField: 'DiscountValue',
    // width: "15%",
    cell: row => `${row?.discountValue} ${row.discountType === "Percentage" ? "%" : "flat"} OFF`
  },
  {
    name: 'Offer Price',
    sortable: false,
    sortField: 'Price',
    // width: "15%",
    cell: row => `₹ ${row?.salePrice}`
  },
  // {
  //   name: 'Product Price',
  //   sortable: false,
  //   sortField: 'PPrice',
  //   cell: row => `₹ ${row?.price}`
  // },
  {
    name: 'Start Date',
    sortable: false,
    sortField: 'S Date',
    cell: row => `${moment(row?.startDate).format("DD-MM-YYYY")}`
  },
  {
    name: 'End Date',
    sortable: false,
    sortField: 'e Date',
    cell: row => `${moment(row?.endDate).format("DD-MM-YYYY")}`
  },
  {
    name: 'Actions',
    cell: row => (
      <>

        <Link color='primary' to={`/flash-sales/view-details/${row._id}`} className='btn-sm  btn-primary'>
          <Eye size={14} />
        </Link>
        {/* <Button color='danger' className='ms-2 btn-sm'
          onClick={e => {
            e.preventDefault()
            // store.dispatch(deleteSubscription(row._id))
          }}
        >    <Trash2 size={14} /></Button> */}
      </>
      // <div className='column-action'>
      //   <UncontrolledDropdown>
      //     <DropdownToggle tag='div' className='btn btn-sm'>
      //       <MoreVertical size={14} className='cursor-pointer' />
      //     </DropdownToggle>
      //     <DropdownMenu>
      //       <DropdownItem tag='a' href='/' className='w-100' onClick={e => { 
      //         e.preventDefault() 
      //         store.dispatch(getProduct(row._id))
      //         }}
      //         >
      //         <Archive size={14} className='me-50' />
      //         <span className='align-middle'>Edit</span>
      //       </DropdownItem>
      //       <DropdownItem
      //         tag='a'
      //         href='/'
      //         className='w-100'
      //         onClick={e => {
      //           e.preventDefault()
      //           store.dispatch(deleteProduct(row._id))
      //         }}
      //       >
      //         <Trash2 size={14} className='me-50' />
      //         <span className='align-middle'>Delete</span>
      //       </DropdownItem>
      //     </DropdownMenu>
      //   </UncontrolledDropdown>
      // </div>
    )
  }
]
