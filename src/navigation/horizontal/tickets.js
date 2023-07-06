// ** Icons Import
import { ShoppingCart, Circle, List, Command, Plus, Eye } from 'react-feather'

export default [
    {
        id: 'tickets',
        title: 'Tickets',
        icon: <Command />,
        roleArr: ["ADMIN"],
        children: [
            {
                id: 'view-tickets',
                title: 'View Tickets',
                icon: <Eye />,
                roleArr: ["ADMIN"],
                navLink: '/Tickets'
            }
        ]
    }
]
