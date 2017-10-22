/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import Floors from './floor-service'
import Tables from './table-service'
import Orders from './order-service'

const services = new Object()

services['floors'] = new Floors()
services['tables'] = new Tables()
services['orders'] = new Orders()

export default services
