// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getProduct, deleteProduct, updateProduct } from '../store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive, Edit } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Input } from 'reactstrap'
import { updateProductApi } from '../../../services/product.service'
import { toastError, toastSuccess } from '../../../utility/toastutill'

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
  // {
  //   name: 'S.no.',
  //   sortable: false,
  //   sortField: 'name',
  //   width: "25%",
  //   cell: (row, i) => i + 1
  // },
  {
    name: 'Name',
    sortable: true,
    sortField: 'name',
    width: "25%",
    cell: row => row.name
  },
  {
    name: 'Price',
    sortable: true,
    sortField: 'Price',
    width: "15%",
    cell: row => row.price
  },
  {
    name: 'Status',
    sortable: true,
    sortField: 'status',
    selector: row => row.status,
    width: "15%",
    cell: row => (
      <Badge style={{ cursor: "pointer" }} className='text-capitalize'
        onClick={e => {
          e.preventDefault()
          store.dispatch(
            updateProduct({
              status: !row.status,
              id: row._id
            })
          )
        }}
        color={statusObj[row.status === true ? 'active' : 'inactive']} pill>
        {row.status === true ? 'active' : 'inactive'}
      </Badge>
    )
  },
  {
    name: 'Approved',
    sortable: true,
    sortField: 'status',
    selector: row => row.approved,
    width: "15%",
    cell: row => (
      //   <div className='form-check form-switch'>
      //   <Input type='switch' name='customSwitch' id='exampleCustomSwitch' defaultChecked={row.approved !== "PENDING" ? 'true' : "false"}  onChange={ () => handleStatus(row._id, row.approved)}  />

      // </div>
      <Badge style={{ cursor: "pointer" }} onClick={e => {
        e.preventDefault()
        store.dispatch(
          updateProduct({
            approved: row.approved === "APPROVED" ? "PENDING" : "APPROVED",
            id: row._id
          })
        )
      }} className='text-capitalize' color={statusObj[row.approved !== "PENDING" ? 'active' : 'pending']} pill>
        {row.approved}
      </Badge>
    )
  },

  {
    name: 'Actions',
    cell: row => (
      <>

        <Link color='primary' to={`/products/edit-product/${row._id}`} className='btn-sm ms-2  btn-primary' onClick={() => {

          store.dispatch(getProduct(row._id))
        }}>     <Edit size={14} /></Link>
        <Button color='danger' className='ms-2 btn-sm'
          onClick={e => {
            e.preventDefault()
            store.dispatch(deleteProduct(row._id))
          }}
        >    <Trash2 size={14} /></Button>
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
