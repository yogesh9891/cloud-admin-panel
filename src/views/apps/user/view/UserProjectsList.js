// ** Reactstrap Imports
import { Card, CardHeader, Progress } from 'reactstrap'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { generateFilePath } from '../../../../services/url.service'

const projectsArr = [
  {
    progress: 60,
    hours: '210:30h',
    progressColor: 'info',
    totalTasks: '233/240',
    subtitle: 'React Project',
    title: 'BGC eCommerce App',
    img: require('@src/assets/images/icons/brands/react-label.png').default
  },
  {
    hours: '89h',
    progress: 15,
    totalTasks: '9/50',
    progressColor: 'danger',
    subtitle: 'UI/UX Project',
    title: 'Falcon Logo Design',
    img: require('@src/assets/images/icons/brands/xd-label.png').default
  },
  {
    progress: 90,
    hours: '129:45h',
    totalTasks: '100/190',
    progressColor: 'success',
    subtitle: 'Vuejs Project',
    title: 'Dashboard Design',
    img: require('@src/assets/images/icons/brands/vue-label.png').default
  },
  {
    hours: '45h',
    progress: 49,
    totalTasks: '12/86',
    progressColor: 'warning',
    subtitle: 'iPhone Project',
    title: 'Foodista mobile app',
    img: require('@src/assets/images/icons/brands/sketch-label.png').default
  },

  {
    progress: 73,
    hours: '67:10h',
    totalTasks: '234/378',
    progressColor: 'info',
    subtitle: 'React Project',
    title: 'Dojo React Project',
    img: require('@src/assets/images/icons/brands/react-label.png').default
  },
  {
    progress: 81,
    hours: '108:39h',
    totalTasks: '264/537',
    title: 'HTML Project',
    progressColor: 'success',
    subtitle: 'Crypto Website',
    img: require('@src/assets/images/icons/brands/html-label.png').default
  },
  {
    progress: 78,
    hours: '88:19h',
    totalTasks: '214/627',
    progressColor: 'success',
    subtitle: 'Vuejs Project',
    title: 'Vue Admin template',
    img: require('@src/assets/images/icons/brands/vue-label.png').default
  }
]

export const columns = [
  {
    sortable: true,
    minWidth: '300px',
    name: 'Project',
    selector: row => row.title,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='avatar-wrapper'>
            <Avatar className='me-1' img={row.img} alt={row.title} imgWidth='32' />
          </div>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>{row.title}</span>
            <small className='text-muted'>{row.subtitle}</small>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Total Tasks',
    selector: row => row.totalTasks
  },
  {
    name: 'Progress',
    selector: row => row.progress,
    sortable: true,
    cell: row => {
      return (
        <div className='d-flex flex-column w-100'>
          <small className='mb-1'>{`${row.progress}%`}</small>
          <Progress
            value={row.progress}
            style={{ height: '6px' }}
            className={`w-100 progress-bar-${row.progressColor}`}
          />
        </div>
      )
    }
  },
  {
    name: 'Hours',
    selector: row => row.hours
  }
]

const UserProjectsList = ({ selectedUser }) => {
  return (
    <Card>
      <CardHeader tag='h4'>Company Details</CardHeader>
      <div className='info-container p-2'>
        {selectedUser?.companyObj !== null ? (
          <ul className='list-unstyled'>
            <li className='mb-75'>
              <span className='fw-bolder me-25'>Name:</span>
              <span>{selectedUser?.companyObj?.name}</span>
            </li>
            <li className='mb-75'>
              <span className='fw-bolder me-25'> Email:</span>
              <span>{selectedUser?.companyObj?.email}</span>
            </li>
            <li className='mb-75'>
              <span className='fw-bolder me-25'>Contact:</span>
              <span>{selectedUser?.companyObj?.phone}</span>
            </li>
            <li className='mb-75'>
              <span className='fw-bolder me-25'>GST No:</span>
              <span>{selectedUser?.companyObj?.phone}</span>
            </li>
            <li className='mb-75'>
              <span className='fw-bolder me-25'>Address:</span>
              <span>{selectedUser?.companyObj?.address}</span>
            </li>
            <li className='mb-75'>
              <span className='fw-bolder me-25'>Place:</span>
              <span>{selectedUser?.cityObj?.name}, {selectedUser?.stateObj?.name},{selectedUser?.countryObj?.name}</span>
            </li>

            <li className='mb-75'>
              <span className='fw-bolder me-25'>Nature of your business:</span>
              <span>{selectedUser?.companyObj?.natureOfBusiness}</span>
            </li>
            <li className='mb-75'>
              <span className='fw-bolder me-25'>Annual Turnover:</span>
              <span>{selectedUser?.companyObj?.annualTurnover}</span>
            </li>
            <li className='mb-75'>
              <span className='fw-bolder me-25'>IEC Code:</span>
              <span>{selectedUser?.companyObj?.iecCode}</span>
            </li>
            <li className='mb-75'>
              <span className='fw-bolder me-25'>Year of Establishment:</span>
              <span>{selectedUser?.companyObj?.yearOfEstablishment}</span>
            </li>
            <li className='mb-75'>
              <span className='fw-bolder me-25'>Legal Status:</span>
              <span>{selectedUser?.companyObj?.legalStatus}</span>
            </li>
            <li className='mb-75'>
              <span className='fw-bolder me-25'>CIN number:</span>
              <span>{selectedUser?.companyObj?.cinNo}</span>
            </li>
            <li className='mb-75'>
              <span className='fw-bolder me-25'>Company Ceo Name:</span>
              <span>{selectedUser?.companyObj?.companyCeo}</span>
            </li>
            <li className='mb-75'>
              <span className='fw-bolder me-25'>Google Maps Link:</span>
              <span><a href={selectedUser?.companyObj?.googleMapsLink} target='_blank'> Click to view on Google Map </a></span>
            </li>
            <li className='mb-75'>
              <span className='fw-bolder me-25'>Profile image:</span>
            </li>
            <li className='mb-75'>
              <div>
              {
                  selectedUser?.profileImage && (
                    <img src={generateFilePath(selectedUser?.profileImage)} width="100px" />
                  )
              }
              </div>
            </li>

            <li className='mb-75'>
              <span className='fw-bolder me-25'>Documents:</span>
            </li>
            <hr />
            <li className='mb-75'>
              <div>
                {selectedUser?.documents && selectedUser?.documents.length > 0 && selectedUser?.documents.map((el, index) => {
                  return (
                    <span style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className='fw-bolder me-25'>{el.name}:</span>
                      <span key={index}><img src={generateFilePath(el.image)} style={{ height: 100 }} alt="" /></span>
                    </span>
                  )
                })}
              </div>
            </li>


            <hr />
            <li className='mb-75'>
              <span className='fw-bolder me-25' style={{ fontSize: 20 }}>Images and Videos</span>
            </li>
            <span className='fw-bolder me-25'>Images:</span>
            <li className='mb-75 row d-flex mt-4'>
              {selectedUser?.imagesArr && selectedUser?.imagesArr.length > 0 && selectedUser?.imagesArr.map((el, index) => {
                return (
                  <div className='col-3 mb-4' key={index}>
                    <a href={generateFilePath(el.image)} target='_blank' style={{ display: "flex", justifyContent: "space-between" }}>
                      <span><img src={generateFilePath(el.image)} style={{ height: 100 }} alt="" /></span>
                    </a>
                  </div>
                )
              })}
            </li>


            <span className='fw-bolder me-25 mb-25'>Videos:</span>
            <li className='mb-75 row d-flex mt-4'>
              {selectedUser?.videoArr && selectedUser?.videoArr.length > 0 && selectedUser?.videoArr.map((el, index) => {
                return (
                  <div className='col-3 mb-4' key={index}>
                    <a href={generateFilePath(el.video)} target='_blank' style={{ display: "flex", justifyContent: "space-between" }}>
                      <video src={generateFilePath(el.video)} style={{ height: 100, width: 100 }}></video>
                    </a>
                  </div>
                )
              })}
            </li>

          </ul>
        ) : null}
      </div>
      {/* <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={projectsArr}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div> */}
    </Card >
  )
}

export default UserProjectsList
