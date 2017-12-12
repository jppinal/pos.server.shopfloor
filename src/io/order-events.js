/* eslint-disable no-console */
import _iolog from './log'
import { newOrder, cancelOrder } from './../services/orders'

export const on = (socket) => {

	socket.on('new order', (order, client) => {
		_iolog(`Client "${client}" emits new order (order: "${order}")`)
		newOrder(order)
	})
	socket.on('cancel order', (order, client) => {
		_iolog(`Client "${client}" emits cancel order (order: "${order}")`)
		cancelOrder(order)
	})

}

export default on
