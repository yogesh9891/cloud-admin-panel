// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
// import { getProduct, deleteProduct } from '../store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive, Edit, Eye } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Input } from 'reactstrap'
import { updateProductApi } from '../../../services/product.service'
import { toastError, toastSuccess } from '../../../utility/toastutill'
import { deleteSubscription } from '../store'
import moment from 'moment'

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
    name: 'Heading',
    sortable: false,
    sortField: 'name',
    cell: row => row?.name
  },
  {
    name: 'User Name',
    sortable: false,
    sortField: 'sname',
    cell: row => row?.userId.name
  },
  {
    name: 'Actions',
    cell: row => (
      <>

        <Link color='primary' to={`/User-Tickets/View/${row._id}`} className='btn-sm  btn-primary'>
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
