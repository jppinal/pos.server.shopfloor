/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import Service, { _uid } from './service'

const model = () => {
	return {
		properties: {
			label: '',
			icon: '',
			color: '',
			position: {
				x: 0, y: 0
			}
		},
		floor: undefined
	}
}

class Tables extends Service {
	constructor() {
		super('tables', model, 'data/tables')
	}
}

export default Tables
