/* eslint-disable no-console */
import DataStore from './nedb-store'

const model = () => {
	return {
		time: new Date(),
		table: undefined,
		bill: undefined,
		lines: []
	}
}

export const orders = new DataStore('orders', model, 'data/orders')

export default orders
