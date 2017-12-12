/* eslint-disable no-console */
import _iolog from './log'

import stores, { types } from './../api/stores'

export const on = (socket) => {

	types.forEach((t) => {

		stores[t].on('updated', (docs) => {
			docs.forEach((doc) => {
				socket.emit(`got ${t}`, doc)
			})
		})

		stores[t].on('saved', () => {
			stores[t].find({})
				.then((response) => {
					socket.emit(`found ${t}`, response)
				})
		})

		stores[t].on('deleted', () => {
			stores[t].find({})
				.then((response) => {
					socket.emit(`found ${t}`, response)
				})
		})

		socket.on(`save ${t}`, (doc, client) => {
			_iolog(`Client "${client}" emits save "${t}" (document: "${doc}")`)
			stores[t].save(doc)
		})

		socket.on(`update ${t}`, (query, update, options, client) => {
			_iolog(`Client "${client}" emits update "${t}" (query: "${query}")`)
			stores[t].update(query, update, options)
		})

		socket.on(`get ${t}`, (query, client) => {
			_iolog(`Client "${client}" emits get "${t}" (query: "${query}")`)
			stores[t].get(query)
				.then((response) => {
					socket.emit(`got ${t}`, response)
				})
		})

		socket.on(`find ${t}`, (query, client) => {
			_iolog(`Client "${client}" emits find "${t}" (query: "${query}")`)
			stores[t].find(query)
				.then((response) => {
					socket.emit(`found ${t}`, response)
				})
		})

		socket.on(`delete ${t}`, (query, options, client) => {
			_iolog(`Client "${client}" emits delete "${t}" (query: "${query}")`)
			stores[t].delete(query, options)
		})

		socket.on(`model ${t}`, (client, send) => {
			_iolog(`Client "${client}" get model "${t}"`)
			send(stores[t].model())
		})

	})
}

export default on
