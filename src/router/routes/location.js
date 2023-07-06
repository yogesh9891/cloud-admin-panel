import { lazy } from 'react'
const CountryList = lazy(() => import('../../views/location/Country/list'))
const StateList = lazy(() => import('../../views/location/State/list'))
const CityList = lazy(() => import('../../views/location/City/list'))

                       
const LocationRoutes = [
  {
    path: 'apps/location/country',
    element: <CountryList />,
    roleArr:["ADMIN"]
  },
  {
    path: 'apps/location/state',
    element: <StateList />,
    roleArr:["ADMIN"]
  },
  {
    path: 'apps/location/city',
    element: <CityList />,
    roleArr:["ADMIN"]
  }

]

export default LocationRoutes
