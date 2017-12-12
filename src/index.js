/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { ioport } from '../config/default.json'

import io, { _iolog } from './io'
io.listen(ioport)
_iolog(`Websockets service listening on port ${ioport}`)

import stores from './api/stores'
console.log('populating with test data')

stores['rooms'].save({ name: 'interior' , label: 'Salón' }).then((room) => {
	console.log(room)
	stores['tables'].random(room._id, Math.random() * (10) + 5)
})
stores['rooms'].save({ name: 'exterior' , label: 'Terraza' }).then((room) => {
	stores['tables'].random(room._id, Math.random() * (10) + 5)
})
