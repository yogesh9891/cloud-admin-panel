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
    name: 'Created By Name',
    sortable: false,
    sortField: 'name',
    width: "15%",
    cell: row => row?.createdByObj?.name
  },
  {
    name: 'Product Name',
    sortable: false,
    sortField: 'name',
    width: "25%",
    cell: row => row?.productObj?.name
  },
  {
    name: 'Lead sent to',
    sortable: false,
    sortField: 'e Date',
    cell: row => row?.userObj?.name
  },
  {
    name: 'Created On',
    sortable: false,
    sortField: 'e Date',
    cell: row => `${moment(row?.createdAt).format("DD-MM-YYYY")}`

  }

]
