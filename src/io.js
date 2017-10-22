/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import Server from 'socket.io'
import services from './services'
import { dbEmitter } from './services/data-store'
import chalk from 'chalk'

export const _iolog = (s) => {
	console.log(chalk.yellow('[io] ') + ' ' + chalk.yellow(s))
}

const _io = new Server()

const e = new dbEmitter()

e.on('created', (type) => {
	_io.sockets.emit('created', { type })
})

_io.on('connection', (socket) => {

	socket.on('save', ({ type, body }, client, send) => {
		_iolog(`Client "${client}" emits save (type: "${type}", body: "${body}")`)
		services[type].save(body)
			.then( ({ response }) => {
				send(response)
			})
	})

	socket.on('update', ({ type, body }, client, send) => {
		_iolog(`Client "${client}" emits update (type: "${type}", body: "${body}")`)
		services[type].update(body)
			.then( ({ response }) => {
				send(response)
			})
	})

	/*	socket.on('relate', ({ id, verb, object_id }, client, send) => {
		_iolog(`Client "${client}" emits relate (id: ${id}, verb: ${verb}, object_id: ${object_id})`)
		relate(id, verb, object_id)
			.then( ({ list }) => {
				send(list)
			})
	}) */

	socket.on('find', ({ type, body }, client, send) => {
		_iolog(`Client "${client}" emits find (type: "${type}", body: "${body}")`)
		services[type].find(body)
			.then( ({ response }) => {
				send(response)
			})
	})

	socket.on('get', ({ type, body }, client, send) => {
		_iolog(`Client "${client}" emits get (type: "${type}", body: "${body}")`)
		services[type].get(body)
			.then( ({ response }) => {
				send(response)
			})
	})

	socket.on('delete', ({ type, body }, client, send) => {
		_iolog(`Client "${client}" emits get (type: "${type}", body: "${body}")`)
		services[type].delete(body)
			.then( ({ response }) => {
				send(response)
			})
	})

	/*	socket.on('search', ({ id, verb }, client, send) => {
		_iolog(`Client "${client}" emits search (id: ${id}, verb: ${verb})`)
		read({ id, verb })
			.then( ({ results }) => {
				send(results)
			})
	}) */

	socket.on('model', ({ type }, client, send) => {
		_iolog(`Client "${client}" get model (type: "${type}")`)
		if (type) {
			send(services[type].model())
		}
	})

})


export default _io
