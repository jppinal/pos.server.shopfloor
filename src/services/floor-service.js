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

class Floors extends Service {
	constructor() {
		super('floors', model, 'data/floors')
	}
}

export default Floors
