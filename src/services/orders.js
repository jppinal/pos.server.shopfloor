import orders from './../api/orders-store'
import { toPending, toOk } from './tables'

export const newOrder = (order) => {
	return new Promise((resolve) => {
		toPending({ _id: order.table }).then((table) => {
			order.bill = table.bill
			orders.save({ document: order }).then(() => {
				resolve()
			})
		})
	})
}

export const cancelOrder = ({ _id, table }) => {
	return new Promise((resolve) => {
		let query = { _id }
		orders.delete({ query }).then(() => {
			toOk({ _id: table }).then(() => {
				resolve()
			})
		})
	})
}
