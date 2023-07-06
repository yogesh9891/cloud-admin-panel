// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Table Columns
import { columns } from './columns'

// ** Store & Actions
import { getAllBrand, getBrand } from '../store'
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

// ** Table Header


const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const brands = useSelector(state => state.brands)
  const brand = useSelector(state => state.brands.brand)

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

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // ** Get data on mount
  useEffect(() => {
    dispatch(getBrand({
      sort,
      sortColumn,
      q: searchTerm,
      perPage: rowsPerPage,
      page: currentPage,
      role: currentRole.value,
      status: currentStatus.value
    }))
  }, [])
  useEffect(() => {
    // dispatch(
    //   getBrand({
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

  }, [dispatch, sort, sortColumn, currentPage])

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
      getBrand({
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
      getBrand({
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
      getBrand({
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
    const count = Number(Math.ceil(brands.total / rowsPerPage))

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
    console.log(brands, "brandsdsdds")
    if (brands.brands.length > 0) {
      return brands.brands
    } else if (!brands || (brands.brands.length === 0 && isFiltered)) {
      return []
    } else {
      return brands.brands.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getBrand({
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


  useEffect(() => {
    if (brands.selectedBrand !== null) {
      toggleSidebar()
    }

  }, [brands.selectedBrand])

  return (
    <Fragment>
      {/* <Card>
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
                    getBrand({
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
            {/* <Col className='my-md-0 my-1' md='4'>
              <Label for='plan-select'>Plan</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={planOptions}
                value={currentPlan}
                onChange={data => {
                  setCurrentPlan(data)
                  dispatch(
                    getBrand({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      page: currentPage,
                      perPage: rowsPerPage,
                      role: currentRole.value,
                      currentPlan: data.value,
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
                    getBrand({
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
      </Card> */}

      <Card className='overflow-hidden'>
        <div className='invoice-list-table-header w-100 px-4 ms-50 mt-2'>
          <Row>
            <Col xl='6' className='d-flex align-items-center p-0'>
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
                  <option value='1'>1</option>
                  <option value='10'>10</option>
                  <option value='25'>25</option>
                  <option value='50'>50</option>
                </Input>
                <label htmlFor='rows-per-page'>Entries</label>
              </div>
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
                {/* <UncontrolledDropdown className='me-1'>
                  <DropdownToggle color='secondary' caret outline>
                    <Share className='font-small-4 me-50' />
                    <span className='align-middle'>Export</span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem className='w-100'>
                      <Printer className='font-small-4 me-50' />
                      <span className='align-middle'>Print</span>
                    </DropdownItem>
                    <DropdownItem className='w-100' onClick={() => downloadCSV(brands.brand)}>
                      <FileText className='font-small-4 me-50' />
                      <span className='align-middle'>CSV</span>
                    </DropdownItem>
                    <DropdownItem className='w-100'>
                      <Grid className='font-small-4 me-50' />
                      <span className='align-middle'>Excel</span>
                    </DropdownItem>
                    <DropdownItem className='w-100'>
                      <File className='font-small-4 me-50' />
                      <span className='align-middle'>PDF</span>
                    </DropdownItem>
                    <DropdownItem className='w-100'>
                      <Copy className='font-small-4 me-50' />
                      <span className='align-middle'>Copy</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown> */}

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
          // subHeaderComponent={
          //   <CustomHeader
          //     brands={brands}
          //     searchTerm={searchTerm}
          //     rowsPerPage={rowsPerPage}
          //     handleFilter={handleFilter}
          //     handlePerPage={handlePerPage}
          //     toggleSidebar={toggleSidebar}
          //   />
          // }
          />
        </div>
      </Card>

      <AddModal open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Fragment>
  )
}

export default UsersList
