// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const UsersList = () => {
  const store = useSelector(state => state.users)
  const [TotalUsers, setTotalUsers] = useState(0)
  const [TotalDistributors, setTotalDistributors] = useState(0)
  const [TotalManufacturers, setTotalManufacturers] = useState(0)
  const [TotalDealers, setTotalDealers] = useState(0)
  // const [, set] = useState()
  useEffect(() => {
    console.log(store, "store")
    if (store) {
      setTotalUsers(store.totalUsers)
      setTotalDistributors(store.totalDistributors)
      setTotalManufacturers(store.totalManufacturers)
      setTotalDealers(store.totalDealers)
    }
  }, [store])

  return (
    <div className='app-user-list'>
      <Row>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='primary'
            statTitle='Total Users'
            icon={<User size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{TotalUsers}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='danger'
            statTitle='Total Manufacturers'
            icon={<UserPlus size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{TotalManufacturers}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='success'
            statTitle='Total Dealers'
            icon={<UserCheck size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{TotalDealers}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='warning'
            statTitle='Total Distributors'
            icon={<UserX size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{TotalDistributors}</h3>}
          />
        </Col>
      </Row>
      <Table />
    </div>
  )
}

export default UsersList
