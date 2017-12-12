import _iolog from './log'
import { getRooms } from './../services/rooms'

export const attachEvents = (socket) => {
	socket.on('get rooms', (query, client, send) => {
		_iolog(`Client "${client}" emits get rooms`)
		getRooms()
			.then( (response) => {
				send(response)
			})
	})
}
