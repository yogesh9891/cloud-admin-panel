

// ** Reactstrap Imports
import { useEffect, useState } from 'react'
import { ArrowUpLeft } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Label, Row } from 'reactstrap'
// import { addSubscription, getSubscriptionById, updateSubscription } from '../store'
import _ from 'lodash'
import { toastError } from '../../../../utility/toastutill'
import { getAllSubscriptionbyUserId } from '../../../../services/UserSubscription.service'
import DataTable from 'react-data-table-component'
import ReactPaginate from 'react-paginate'
import moment from 'moment'
export default function UserWithSubscriptionDetail() {
    const { id } = useParams()
    const [userSubscriptionsArr, setUserSubscriptionsArr] = useState([])
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
    const [totalPages, setTotalPages] = useState(0)
    const handleGetUsersSubscriptionById = async (query) => {
        try {
            const { data: res } = await getAllSubscriptionbyUserId(query)
            if (res.data) {
                console.log(res, "userSUb")
                setUserSubscriptionsArr(res.data)
                setTotalPages(res.totalCount)
            }
        } catch (err) {
            toastError(err)
        }
    }

    useEffect(() => {
        // console.log(id ? "true" : "false")
        if (id) {
            handleGetUsersSubscriptionById(`userId=${id}&rowsPerPage=${rowsPerPage}&currentPage=${currentPage}`)
        }

    }, [id])

    const columns = [
        {
            name: 'Subscription Name',
            sortable: false,
            minWidth: '300px',
            selector: row => row.name,
            cell: row => (
                <div className='d-flex justify-content-left align-items-center'>
                    {/* {renderClient(row)} */}
                    <div className='d-flex flex-column'>
                        <Link
                            to={``}
                            className='user_name text-truncate text-body'
                            onClick={() => dispatch(getUser(row?.id))}
                        >
                            <span className='fw-bolder'>{row?.name}</span>
                        </Link>
                        <small className=' mb-0'>{row?.email}</small>
                    </div>
                </div>
            )
        },
        {
            name: 'Purchased On',
            minWidth: '138px',
            sortable: false,
            selector: row => moment(row.createdAt).format("DD-MM-YYYY")
        },
        {
            name: 'Starts On',
            minWidth: '138px',
            sortable: false,
            selector: row => moment(row.startDate).format("DD-MM-YYYY")
        },
        {
            name: 'Ends On',
            minWidth: '138px',
            sortable: false,
            selector: row => moment(row.endDate).format("DD-MM-YYYY")
        },
        {
            name: 'Price Paid',
            minWidth: '138px',
            sortable: false,
            selector: row => `Rs ${row.price}`
        },
        {
            name: 'Flash Sales',
            minWidth: '138px',
            sortable: false,
            selector: row => `${row.numberOfSales} for ${row.saleDays} Days`
        },
        {
            name: 'Advertisements',
            minWidth: '138px',
            sortable: false,
            selector: row => `${row.numberOfAdvertisement} for ${row.advertisementDays} Days`
        }
        // {
        //   name: 'Billing',
        //   minWidth: '230px',
        //   sortable: true,
        //   sortField: 'billing',
        //   selector: row => row.billing,
        //   cell: row => <span className='text-capitalize'>{row.billing}</span>
        // },

    ]

    const handlePagination = page => {
        setCurrentPage(page.selected + 1)
        console.log(page.selected, "totalCount")
        handleGetUsersSubscriptionById(`userId=${id}&rowsPerPage=${rowsPerPage}&currentPage=${page.selected + 1}`)
        // dispatch(
        //   getAllUsersWithSubsciptionFn({
        //     sort,
        //     sortColumn,
        //     q: searchTerm,
        //     perPage: rowsPerPage,
        //     page: page.selected + 1,
        //     role: currentRole.value,
        //     status: currentStatus.value
        //   })
        // )
        // setCurrentPage(page.selected + 1)
    }

    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        setCurrentPage(1)
        handleGetUsersSubscriptionById(`userId=${id}&rowsPerPage=${value}&currentPage=${1}`)
        setRowsPerPage(value)
    }


    const CustomPagination = () => {
        const count = Number(Math.ceil(totalPages / rowsPerPage))

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
    return (
        <Card>
            <CardHeader>
                <Link to="/apps/user/Users-With-Subscription" className=' btn btn-sm btn-warning' color='primary'>
                    <ArrowUpLeft />Back
                </Link>

                <Col xl='9' className='d-flex align-items-center p-0'>
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
                <CardTitle tag='h4'>User's Subscriptions</CardTitle>
            </CardHeader>

            <CardBody>
                <Row>
                    <div>
                        <DataTable
                            noHeader
                            pagination
                            columns={columns}
                            paginationServer
                            paginationComponent={CustomPagination}
                            // sortIcon={<ChevronDown />}
                            data={userSubscriptionsArr}
                        />
                    </div>
                </Row>
            </CardBody>
        </Card >
    )
}