import _iolog from './log'
import { getBill, moveBill, cancelBill } from './../services/bills'

export const attachEvents = (socket) => {
	socket.on('move bill', ({ bill, table }, client, send) => {
		_iolog(`Client "${client}" emits move bill (bill: "${bill}", table: "${table}")`)
		moveBill(bill, table)
			.then( ({ response }) => {
				send(response)
			})
	})
	socket.on('cancel bill', ({ bill }, client, send) => {
		_iolog(`Client "${client}" emits cancel bill (bill: "${bill}")`)
		cancelBill(bill)
			.then( ({ response }) => {
				send(response)
			})
	})
	socket.on('get bill', (bill, client) => {
		_iolog(`Client "${client}" emits cancel bill (bill: "${bill}")`)
		getBill(bill).then((response) => {
			socket.emit('got bill', response)
		})
	})
}
