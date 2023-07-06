// ** Icons Import
import { ShoppingCart, Circle, List, Command, Plus, Eye } from 'react-feather'

export default [
    {
        id: 'subscriptions',
        title: 'Subscriptions',
        icon: <Command />,
        roleArr: ["ADMIN"],
        children: [
            {
                id: 'ViewSubscriptions',
                title: 'View Subscriptions',
                icon: <Eye />,
                roleArr: ["ADMIN"],
                navLink: '/subscription/view'
            }
            // {
            //     id: 'ViewAdvertisementSubscriptions',
            //     title: 'View advertisement Subscriptions',
            //     icon: <Eye />,
            //     roleArr: ["ADMIN"],
            //     navLink: '/subscription/advertisement/view'
            // }
        ]
    }
]
