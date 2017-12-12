/* eslint-disable no-console */
import DataStore from './nedb-store'

const model = () => {
	return {
		label: '',
		icon: '',
		color: '',
		top: 0,
		left: 0,
		status: 'free',
		bill: undefined,
		room: undefined
	}
}

export const tables = new DataStore('tables', model, 'data/tables')

tables.random = (room, n=1) => {
	for(var i=0;i<n;i++) {
		var top = Math.floor(i/5)
		var left = (i - 5*top)
		tables.save({
			name: `table-${i}`,
			label: `M${i}`,
			top: `${top*60 + 60}px`,
			left: `${left*60}px`,
			color: 'secondary',
			room
		})
	}
}

export default tables
