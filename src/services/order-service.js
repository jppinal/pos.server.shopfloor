/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import Service, { _uid } from './service'

const model = () => {
	return {
		properties: {
			label: '',
			icon: ''
		}
	}
}

class Orders extends Service {
	constructor() {
		super('orders', model, 'data/orders')
	}
}

export default Orders
