// ** React Imports
import { Fragment } from 'react'

// ** Routes Imports
import AppRoutes from './Apps'
import FormRoutes from './Forms'
import PagesRoutes from './Pages'
import TablesRoutes from './Tables'
import ChartsRoutes from './Charts'
import DashboardRoutes from './Dashboards'
import UiElementRoutes from './UiElements'
import ExtensionsRoutes from './Extensions'
import PageLayoutsRoutes from './PageLayouts'
import AuthenticationRoutes from './Authentication'

// ** Layouts
import BlankLayout from '@layouts/BlankLayout'
import VerticalLayout from '@src/layouts/VerticalLayout'
import HorizontalLayout from '@src/layouts/HorizontalLayout'
import LayoutWrapper from '@src/@core/layouts/components/layout-wrapper'

// ** Route Components
import PublicRoute from '@components/routes/PublicRoute'
import PrivateRoute from '@components/routes/PrivateRoute'

// ** Utils
import { isObjEmpty } from '@utils'
import ProductRoutes from './Product'
import LocationRoutes from './location.js'

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />
}

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/apps/user/list'

// ** Merge Routes
const Routes = [
  ...AuthenticationRoutes,
  ...DashboardRoutes,
  ...AppRoutes,
  ...FormRoutes,
  ...ProductRoutes,
  ...LocationRoutes,
  ...PagesRoutes,
  ...UiElementRoutes,
  ...ExtensionsRoutes,
  ...PageLayoutsRoutes,
  ...TablesRoutes,
  ...ChartsRoutes
]

// const getRouteMeta = route => {
//   if (isObjEmpty(route.element.props)) {
//     if (route.meta) {
//       return { routeMeta: route.meta }
//     } else {
//       return {}
//     }
//   }
// }

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = []
  // console.log(layout, defaultLayout, Routes, "asd")
  if (Routes) {
    Routes.filter(route => {
      const isBlank = false
      // ** Checks if Route layout or Default layout matches current layout
      // if (
      //   (route.meta && route.meta.layout && route.meta.layout === layout) ||
      //   ((route.meta === undefined || route.meta.layout === undefined) && defaultLayout === layout)
      // ) {
      const RouteTag = PrivateRoute

      // // ** Check for public or private route
      // if (route.meta) {
      //   route.meta.layout === 'blank' ? (isBlank = true) : (isBlank = false)
      //   RouteTag = route.meta.publicRoute ? PublicRoute : PrivateRoute
      // }
      // if (route.element) {
      //   const Wrapper =
      //     // eslint-disable-next-line multiline-ternary
      //     isObjEmpty(route.element.props) && isBlank === false
      //       ? // eslint-disable-next-line multiline-ternary
      //         LayoutWrapper
      //       : Fragment

      //   route.element = (
      //     <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
      //       <RouteTag route={route}>{route.element}</RouteTag>
      //     </Wrapper>
      //   )
      // }

      // Push route to LayoutRoutes
      if (route.element) {
        const Wrapper =
          // eslint-disable-next-line multiline-ternary
          isObjEmpty(route.element.props) && isBlank === false
            ? // eslint-disable-next-line multiline-ternary
            LayoutWrapper
            : Fragment

        route.element = (
          <Wrapper >
            <RouteTag route={route}>{route.element}</RouteTag>
          </Wrapper>
        )
      }
      LayoutRoutes.push(route)
      // }
      return LayoutRoutes
    })
  }
  return LayoutRoutes
}

const getRoutes = layout => {
  const defaultLayout = layout || 'vertical'
  const layouts = ['vertical', 'horizontal', 'blank']
  // const layouts = ['blank']
  // console.log(layout, "layout")
  const AllRoutes = []

  layouts.forEach(layoutItem => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)

    AllRoutes.push({
      path: '/',
      element: getLayout[defaultLayout],
      children: LayoutRoutes
    })
  })
  // console.log(AllRoutes, "AllRoutes")
  return AllRoutes
}

export { DefaultRoute, TemplateTitle, Routes, getRoutes }
