/* eslint-disable no-console */
import DataStore from './nedb-store'

const model = () => {
	return {
		name: '',
		label: '',
		icon: ''
	}
}

export const rooms = new DataStore('rooms', model, 'data/rooms')

export default rooms
