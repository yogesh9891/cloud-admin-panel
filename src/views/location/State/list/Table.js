// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Table Columns
import { columns } from './columns'

// ** Store & Actions
import { getAllState, getState } from '../store'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { ROLES_CONSTANT } from '../../../../utility/constant'
import AddModal from './AddModal'
import { getAllCountry } from '../../Country/store'


const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const states = useSelector(state => state.states)
  const brand = useSelector(state => state.states.brand)

  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState({ value: '', label: 'Select Role' })
  // const [currentPlan, setCurrentPlan] = useState({ value: '', label: 'Select Plan' })
  const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Select Status', number: 0 })
  const [rolesOptions, setrolesOptions] = useState([])
  const [seletectedCountryToFilterWith, setSeletectedCountryToFilterWith] = useState("")
  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const countries = useSelector(state => state.countries)

  // ** Get data on mount
  useEffect(() => {
    dispatch(getState({
      sort,
      sortColumn,
      q: searchTerm,
      perPage: rowsPerPage,
      page: currentPage,
      role: currentRole.value,
      status: currentStatus.value,
      countryId: seletectedCountryToFilterWith?.value
    }))

    dispatch(getAllCountry())

  }, [])
  useEffect(() => {
    // dispatch(
    //   getState({
    //     sort,
    //     sortColumn,
    //     q: searchTerm,
    //     page: currentPage,
    //     perPage: rowsPerPage,
    //     role: currentRole.value,
    //     status: currentStatus.value
    //     // currentPlan: currentPlan.value
    //   })
    // )
    // ** Set Roles

  }, [dispatch, sort, sortColumn, currentPage, seletectedCountryToFilterWith?.value])

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
    { value: '', label: 'Select Status', number: 0 },
    { value: 'active', label: 'Active', number: true },
    { value: 'inactive', label: 'Inactive', number: false }
  ]

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getState({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
        role: currentRole.value,
        status: currentStatus.value,
        countryId: seletectedCountryToFilterWith?.value
      })
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    setCurrentPage(1)

    dispatch(
      getState({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: value,
        page: 1,
        role: currentRole.value,
        status: currentStatus.value,
        countryId: seletectedCountryToFilterWith?.value
      })
    )
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getState({
        sort,
        q: val,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        countryId: seletectedCountryToFilterWith?.value
      })
    )
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(states.total / rowsPerPage))

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
    const filters = {
      role: currentRole.value,
      status: currentStatus.value,
      q: searchTerm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })
    console.log(states, "statesdsdds")
    if (states.states.length > 0) {
      return states.states
    } else if (!states || (states.states.length === 0 && isFiltered)) {
      return []
    } else {
      return states.states.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getState({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        countryId: seletectedCountryToFilterWith.value
      })
    )
  }


  useEffect(() => {
    if (states.selectedState !== null) {
      toggleSidebar()
    }

  }, [states.selectedState])

  return (
    <Fragment>

      <Card className='overflow-hidden'>
        <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 px-4'>
          <Row>
            <Col xl='2' className='d-flex align-items-center p-0'>
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
            >
              <Select
                isClearable={false}
                value={seletectedCountryToFilterWith}
                options={countries.countries.map(el => ({ label: el.name, value: el._id }))}
                className='react-select'
                classNamePrefix='select'
                // theme={selectThemeColors}
                onChange={data => {
                  console.log("data", data)
                  setSeletectedCountryToFilterWith(data)
                  dispatch(
                    getState({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      role: data.value,
                      page: currentPage,
                      perPage: rowsPerPage,
                      status: currentStatus.value,
                      countryId: data.value
                    })
                  )
                }}
              />
            </Col>
            <Col
              xl='6'
              className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
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

              <div className='d-flex align-items-center table-header-actions'>
                <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
                  Add New
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={dataToRender()}
          />
        </div>
      </Card>

      <AddModal open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Fragment>
  )
}

export default UsersList
