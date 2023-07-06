// ** Navigation imports
import apps from './apps'
// import pages from './pages'
// import others from './others'
// import charts from './charts'
// import uiElements from './ui-elements'
import formsAndTables from './forms-tables'
import dashboards from './dashboards'
import product from './product'
import subscriptions from './subscriptions'
import flashSales from './flashSales'
import tickets from './tickets'
import { Command, Eye, Home, Users } from 'react-feather'

// ** Merge & Export
// export default [...dashboards, ...apps, ...uiElements, ...formsAndTables, ...pages, ...charts, ...others]
export default [...dashboards, ...apps, ...product, ...formsAndTables, ...subscriptions, ...flashSales, ...tickets,
{
    id: 'flash-sales',
    title: 'Reports',
    icon: <Command />,
    roleArr: ["ADMIN"],
    children: [
        {
            id: 'view-flash-sales',
            title: 'Flash sales',
            icon: <Eye />,
            roleArr: ["ADMIN"],
            navLink: '/flash-sales/view'
        },
        {
            id: 'view-Promotions',
            title: 'Promotions',
            icon: <Eye />,
            roleArr: ["ADMIN"],
            navLink: '/Promotions/view'
        },
        {
            id: 'view-Subscriptions',
            title: 'Subscriptions',
            icon: <Eye />,
            roleArr: ["ADMIN"],
            navLink: '/Subscription/view-user-count'
        },
        {
            id: 'view-Leads',
            title: 'Leads',
            icon: <Eye />,
            roleArr: ["ADMIN"],
            navLink: '/Leads/view'
        }
    ]
},
{
    id: 'dashboards',
    title: 'User Requirements',
    icon: <Users />,
    roleArr: ["ADMIN"],
    navLink: '/user-requirements'
}
]
