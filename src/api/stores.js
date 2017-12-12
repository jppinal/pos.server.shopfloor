import ordersStore from './orders-store'
import roomsStore from './rooms-store'
import tablesStore from './tables-store'

const stores = {}
stores['orders'] = ordersStore
stores['rooms'] = roomsStore
stores['tables'] = tablesStore

export const types = ['orders', 'rooms', 'tables']

export const validate = (str) => {
	return (str in types)
}

export default stores
