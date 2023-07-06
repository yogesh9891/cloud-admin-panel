// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getCity, deleteCity, getCityById } from '../store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive, Edit } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap'

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
    name: 'Name',
    sortable: true,
    sortField: 'name',
    width:"15%",
    cell: row => row.name
  },
  {
    name: 'State',
    sortable: true,
    sortField: 'state',
    width:"15%",
    cell: row => row?.stateObj?.name
  },
  {
    name: 'Country',
    sortable: true,
    sortField: 'country',
    width:"15%",
    cell: row => row?.countryObj?.name
  },
  {
    name: 'Status',
    sortable: true,
    sortField: 'status',
    selector: row => row.status,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.status === true ? 'active' : 'inactive']} pill>
       {row.status === true ? 'Active' : 'Inactive'}
      </Badge>
    )
  },
  {
    name: 'Actions',
    cell: row => (
      <>
      <Button color='primary'  className='btn-sm' onClick={e => { 
              e.preventDefault() 
              store.dispatch(getCityById(row._id))
              }}>     <Edit size={14} /></Button>
      <Button color='danger' className='mx-2 btn-sm'  
                    onClick={e => {
                e.preventDefault()
                store.dispatch(deleteCity(row._id))
              }}
      >    <Trash2 size={14}  /></Button>
      </>
      // <div className='column-action'>
      //   <UncontrolledDropdown>
      //     <DropdownToggle tag='div' className='btn btn-sm'>
      //       <MoreVertical size={14} className='cursor-pointer' />
      //     </DropdownToggle>
      //     <DropdownMenu>
      //       <DropdownItem tag='a' href='/' className='w-100' onClick={e => { 
      //         e.preventDefault() 
      //         store.dispatch(getCityById(row._id))
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
      //           store.dispatch(deleteCity(row._id))
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
