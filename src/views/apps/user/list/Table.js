// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components

// ** Store & Actions

// ** Icons Imports
import { approveUserById, verifyUserById } from '../../../../services/user.service'
import { toastError, toastSuccess } from '../../../../utility/toastutill'

// ** React Imports
import { Fragment, useEffect, useState } from 'react'
// ** Invoice List Sidebar

// ** Table Columns

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getAllData, getData } from '../store'

// ** Third Party Components
import DataTable from 'react-data-table-component'
import { ChevronDown, Database, Edit, Edit2, FileText, Settings, Slack, Trash2, User } from 'react-feather'
import ReactPaginate from 'react-paginate'
import Select from 'react-select'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import {
  Button, Card, CardBody, CardHeader, CardTitle, Col, Input,
  Label, Row
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { ROLES_CONSTANT } from '../../../../utility/constant'
import AddModal from './AddModal'
import EditModal from './EditModal'


const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.users)
  const [selectedUser, setSelectedUser] = useState({})
  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('name')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState({ value: '', label: 'Select Role' })
  // const [currentPlan, setCurrentPlan] = useState({ value: '', label: 'Select Plan' })
  const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Select Status', number: 0 })
  const [rolesOptions, setrolesOptions] = useState([])
  const [editModal, setEditModal] = useState(false)
  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleFn = () => setEditModal(!editModal)

  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllData())
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        showName: true
        // currentPlan: currentPlan.value
      })
    )
    // ** Set Roles

    const roleSelect = Object.values(ROLES_CONSTANT).map(el => {
      return { label: el, value: el }
    })
    // console.log(store, "storestorestorestore")
    setrolesOptions([{ label: "All", value: "All" }, ...roleSelect])

  }, [dispatch, store.data.length, sort, sortColumn, currentPage])

  // ** User filter options
  // const roleOptions = [
  //   { value: '', label: 'Select Role' },
  //   { value: 'admin', label: 'Admin' },
  //   { value: 'author', label: 'Author' },
  //   { value: 'editor', label: 'Editor' },
  //   { value: 'maintainer', label: 'Maintainer' },
  //   { value: 'subscriber', label: 'Subscriber' }
  // ]

  // const planOptions = [
  //   { value: '', label: 'Select Plan' },
  //   { value: 'basic', label: 'Basic' },
  //   { value: 'company', label: 'Company' },
  //   { value: 'enterprise', label: 'Enterprise' },
  //   { value: 'team', label: 'Team' }
  // ]

  const statusOptions = [
    { value: '', label: 'Select Status/View All', number: 0 },
    { value: 'active', label: 'Active', number: true },
    { value: 'inactive', label: 'Inactive', number: false }
  ]

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
        role: currentRole.value,
        status: currentStatus.value
      })
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    setCurrentPage(1)
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: value,
        page: 1,
        role: currentRole.value,
        status: currentStatus.value
      })
    )
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getData({
        sort,
        q: val,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value
      })
    )
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage))

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    )
  }

  // ** Table data to render
  const dataToRender = () => {

    return store.data

  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value
      })
    )
  }


  const handleSelectEdit = (value) => {
    setSelectedUser(value)
    // toggleFn()
  }


  const handleStatus = async (id, status) => {
    try {
      const obj = {
        status
      }
      const { data: res } = await approveUserById(id, obj)
      if (res.message) {
        toastSuccess(res.message)
        dispatch(
          getData({
            sort,
            sortColumn,
            q: searchTerm,
            page: currentPage,
            perPage: rowsPerPage,
            role: currentRole.value,
            status: currentStatus.value,
            showName: true
          }))
      }
    } catch (error) {
      toastError(error)
    }
  }


  const handleVerification = async (id, status) => {
    try {
      const obj = {
        isVerified: status
      }
      const { data: res } = await verifyUserById(id, obj)
      if (res.message) {
        toastSuccess(res.message)
        dispatch(
          getData({
            sort,
            sortColumn,
            q: searchTerm,
            page: currentPage,
            perPage: rowsPerPage,
            role: currentRole.value,
            status: currentStatus.value,
            showName: true
          }))
      }
    } catch (error) {
      toastError(error)
    }
  }


  // ** Renders Role Columns
  const renderRole = row => {
    const roleObj = {
      USER: {
        class: 'text-primary',
        icon: User
      },
      MANUFACTURER: {
        class: 'text-success',
        icon: Database
      },
      editor: {
        class: 'text-info',
        icon: Edit2
      },
      DISTRIBUTER: {
        class: 'text-warning',
        icon: Settings
      },
      DEALER: {
        class: 'text-danger',
        icon: Slack
      },
      APPROVERS: {
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


  const columns = [
    {
      name: 'User',
      sortable: true,
      minWidth: '300px',
      sortField: 'fullName',
      selector: row => row.name,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {/* {renderClient(row)} */}
          <div className='d-flex flex-column'>
            <Link
              to={`/apps/user/view/${row.id}`}
              className='user_name text-truncate text-body'
              onClick={() => dispatch(getUser(row.id))}
            >
              <span className='fw-bolder'>{row.name}</span>
            </Link>
            <small className=' mb-0'>{row.email}</small>
          </div>
        </div>
      )
    },
    {
      name: 'Role',
      sortable: true,
      minWidth: '172px',
      sortField: 'role',
      selector: row => row?.role,
      cell: row => renderRole(row)
    },
    // {
    //   name: 'Plan',
    //   minWidth: '138px',
    //   sortable: true,
    //   sortField: 'currentPlan',
    //   selector: row => row.currentPlan,
    //   cell: row => <span className='text-capitalize'>{row.currentPlan}</span>
    // },
    // {
    //   name: 'Billing',
    //   minWidth: '230px',
    //   sortable: true,
    //   sortField: 'billing',
    //   selector: row => row.billing,
    //   cell: row => <span className='text-capitalize'>{row.billing}</span>
    // },
    {
      name: 'Approved',
      minWidth: '138px',
      sortable: false,
      sortField: 'approved',
      selector: row => row.approved,
      cell: row => (
        <div className='form-check form-switch'>
          <Input type='switch' name='customSwitch' id='exampleCustomSwitch' checked={row.approved} onChange={() => handleStatus(row._id, !row.approved)} />

        </div>

      )
    },
    {
      name: 'Is Verified',
      minWidth: '138px',
      sortable: false,
      sortField: 'approved',
      selector: row => row.isVerified,
      cell: row => (
        <div className='form-check form-switch'>
          <Input type='switch' name='customSwitch' id='exampleCustomSwitch' checked={row.isVerified} onChange={() => handleVerification(row._id, !row.isVerified)} />

        </div>

      )
    },
    {
      name: 'Actions',
      minWidth: '100px',
      sortable: false,

      cell: row => (
        <>
          <Link color='success' className='btn-sm btn-success' to={`/apps/user/view/${row._id}`}
            onClick={() => dispatch(getUser(row.id))}
          >     <FileText size={14} /></Link>
          <Button color='primary' onClick={(e) => { e.preventDefault(); setSelectedUser(row); setEditModal(true) }} className='btn-sm ms-2 '
          // onClick={e => {
          //   e.preventDefault()
          //   store.dispatch(getCityById(row._id))
          // }}
          >
            <Edit size={14} />
          </Button>
          <Button color='danger' className='ms-2 btn-sm'
            onClick={e => {
              e.preventDefault()
              dispatch(deleteUser(row._id))
            }}
          >    <Trash2 size={14} /></Button>
        </>

      )
    }
  ]

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Filters</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='4'>
              <Label for='role-select'>Role</Label>
              <Select
                isClearable={false}
                value={currentRole}
                options={rolesOptions}
                className='react-select'
                classNamePrefix='select'
                theme={selectThemeColors}
                onChange={data => {
                  setCurrentRole(data)
                  dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      role: data.value,
                      page: currentPage,
                      perPage: rowsPerPage,
                      status: currentStatus.value
                    })
                  )
                }}
              />
            </Col>

            <Col md='4'>
              <Label for='status-select'>Status</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={statusOptions}
                value={currentStatus}
                onChange={data => {
                  setCurrentStatus(data)
                  dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      page: currentPage,
                      status: data.value,
                      perPage: rowsPerPage,
                      role: currentRole.value
                    })
                  )
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>


      <Card className='overflow-hidden'>

        <div className='mx-2 pt-2 pb-3'>
          <Row>
            <Col xl='8' className='d-flex align-items-center p-0'>
              <div className='d-flex align-items-center w-100'>
                <label htmlFor='rows-per-page'>Show</label>
                <Input
                  className='mx-50'
                  type='select'
                  id='rows-per-page'
                  value={rowsPerPage}
                  onChange={handlePerPage}
                  style={{ width: '5rem' }}
                >
                  <option value='10'>10</option>
                  <option value='25'>25</option>
                  <option value='50'>50</option>
                  <option value='100'>100</option>
                  <option value='500'>500</option>
                </Input>
                <label htmlFor='rows-per-page'>Entries</label>
              </div>
            </Col>
            <Col
              xl='4'
              className='d-flex justify-content-end'
            >
              <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
                <label className='mb-0' htmlFor='search-invoice'>
                  Search:
                </label>
                <Input
                  id='search-invoice'
                  className='ms-50 w-100'
                  type='text'
                  value={searchTerm}
                  onChange={e => handleFilter(e.target.value)}
                />
              </div>

              <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
                Add New User
              </Button>
            </Col>
          </Row>
        </div>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            pagination
            columns={columns}
            paginationServer
            paginationComponent={CustomPagination}
            // sortIcon={<ChevronDown />}
            className='react-dataTable'
            data={store.data}
          />
        </div>
      </Card>

      <AddModal open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <EditModal open={editModal} toggleFn={(value) => setEditModal(value)} selectedUser={selectedUser} />

      {/* <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} /> */}
    </Fragment>
  )
}

export default UsersList
