
// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getSubscriptionSubscribedUser } from '../store'

// ** Third Party Components
import DataTable from 'react-data-table-component'
import ReactPaginate from 'react-paginate'

// ** Utils

// ** Reactstrap Imports
import {
  Card, Col, Input, Row
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Link, useParams } from 'react-router-dom'


const AllSubscribedUsers = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const params = useParams()
  const store = useSelector(state => state.subscription)
  const subscriptionArr = useSelector(state => state.subscription.data)
  const allData = useSelector(state => state.products.allData)

  const [dataArr, setDataArr] = useState([])


  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    setDataArr(subscriptionArr)
  }, [subscriptionArr])


  // ** Function in get data on rows per page


  const handlePagination = page => {
    dispatch(
      getSubscriptionSubscribedUser({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
        id: params.id
      })
    )
    setCurrentPage(page.selected + 1)
  }
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    setCurrentPage(1)

    dispatch(getSubscriptionSubscribedUser({
      sort,
      sortColumn,
      q: searchTerm,
      perPage: value,
      page: 1,
      id: params.id
    }))
    setRowsPerPage(value)
  }

  const handlegetSubscriptionSubscribedUsers = () => {
    dispatch(getSubscriptionSubscribedUser({
      sort,
      sortColumn,
      q: searchTerm,
      perPage: rowsPerPage,
      page: currentPage,
      id: params.id
    }))
  }


  useEffect(() => {
    handlegetSubscriptionSubscribedUsers()
  }, [])


  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getSubscriptionSubscribedUser({
        sort,
        sortColumn,
        q: val,
        perPage: rowsPerPage,
        page: currentPage,
        id: params.id
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

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
  }

  const columns = [
    {
      name: 'S.no',
      sortable: false,
      sortField: 'index',
      // width: "10%",
      cell: (row, index) => (index + 1)
    },
    {
      name: 'Name',
      sortable: false,
      sortField: 'name',
      // width: "25%",
      cell: row => row?.name
    },
    {
      name: 'Description',
      sortable: false,
      sortField: 'description',
      // width: "25%",
      cell: row => row?.description
    },
    {
      name: 'Duration in months',
      sortable: false,
      sortField: 'noOfMonth',
      // width: "15%",
      cell: row => `${row?.noOfMonth} ${row.noOfMonth === 1 ? "month" : "months"}`
    },
    {
      name: 'Users Subscribed',
      sortable: false,
      sortField: 'usersCount',
      // width: "15%",
      cell: row => `${row?.usersCount}`
    },
    {
      name: 'Price',
      sortable: false,
      sortField: 'Price',
      // width: "15%",
      cell: row => `₹ ${row?.price}`
    },
    {
      name: 'Actions',
      cell: row => (
        <>

          {/* <Link color='primary' to={`/Subscription/view-users/${row._id}`} className='btn-sm  btn-primary'>
            <Eye size={14} />
          </Link> */}

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

  return (
    <Fragment>


      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
          <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 px-4 mb-2'>
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
                    <option value='100'>100</option>
                    <option value='500'>500</option>
                  </Input>
                  <label htmlFor='rows-per-page'>Entries</label>
                </div>
              </Col>
              <Col
                xl='6'
                className='d-flex justify-content-end pe-3'
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
                  <Link to="/subscription/Add" className='add-new-user btn btn-primary' color='primary'>
                    Add New
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
          <DataTable
            noHeader
            // subHeader
            // sortServer
            // responsive
            pagination
            paginationServer
            columns={columns}
            // onSort={handleSort}
            // sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={subscriptionArr}
          // subHeaderComponent={
          //   <CustomHeader
          //     store={dataArr}
          //     searchTerm={searchTerm}
          //     rowsPerPage={rowsPerPage}
          //     handlePerPage={handlePerPage}
          //     handleFilter={handleFilter}
          //   // toggleSidebar={toggleSidebar}
          //   />
          // }
          />
        </div>
      </Card>

    </Fragment>
  )
}

export default AllSubscribedUsers
