// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import todo from '@src/views/apps/todo/store'
import chat from '@src/views/apps/chat/store'
import users from '@src/views/apps/user/store'
import email from '@src/views/apps/email/store'
import kanban from '@src/views/apps/kanban/store'
import invoice from '@src/views/apps/invoice/store'
import calendar from '@src/views/apps/calendar/store'
import ecommerce from '@src/views/apps/ecommerce/store'
import dataTables from '@src/views/tables/data-tables/store'
import permissions from '@src/views/apps/roles-permissions/store'
import categories from '@src/views/products/category/store'
import brands from '@src/views/products/brand/store'
import products from '@src/views/products/store'
import countries from '@src/views/location/Country/store'
import states from '@src/views/location/State/store'
import cities from '@src/views/location/City/store'
import subscription from '@src/views/Subscriptions/store'
import UsersWithSubscription from '@src/views/apps/UsersWithSubscription/store'
import FlashSales from '@src/views/Reports/FlashSales/store'
import AdvertisementSubscriptions from '@src/views/AdvertisementSubsctiptions/store'
import Tickets from '@src/views/UserTickets/store'
import promotions from '@src/views/Reports/Advertisements/store'
import Leads from '@src/views/Reports/Leads/store'
import UserRequirements from '@src/views/apps/UserRequirements/store'

const rootReducer = {
  auth,
  categories,
  brands,
  countries,
  states,
  cities,
  products,
  subscription,
  todo,
  chat,
  email,
  users,
  kanban,
  navbar,
  layout,
  invoice,
  calendar,
  ecommerce,
  dataTables,
  permissions,
  UsersWithSubscription,
  FlashSales,
  AdvertisementSubscriptions,
  Tickets,
  Promotions: promotions,
  UserRequirements,
  Leads
}

export default rootReducer
