/* eslint-disable no-console */
import services from './services'
import { Router } from 'express'

const routes = Router()

routes.route('/:type')
// GET returns all object of the defined type
	.get( (req, res) => {
		let query = {}
		services[req.params.type].find(query)
			.then( ({ response }) => {
				res
					.status(200)
					.json(response)
			})
	})
// POST creates a new object id attached to its properties
	.post( (req, res) => {
		services[req.params.type].create(req.body)
			.then( ({ response }) => {
				res.json(response)
			})
	})

routes.route('/:type/:id/')
// GET /:id returns an specific object
	.get( (req, res) => {
		services[req.params.type].get({ id: req.params.id })
			.then( ({ response }) => {
				res.json(response)
			})
	})
// PUT /:id updates all properties of an object
	.put( (req, res) => {
		services[req.params.type].update(req.body)
			.then( ({ response }) => {
				res.json(response)
			})
	})

/* routes.route('/:type/:id/:verb')
	// GET /:id/:verb returns all objects related to
	.get( (req, res) => {
		read({ id: req.params.id, verb: req.params.verb })
			.then( ({ results }) => {
				res.json(results)
			})
	})

routes.route('/:type/:id/:verb/:object_id')
	// PUT /:id updates all properties of an article
	.put( (req, res) => {
		relate(req.params.id, req.params.verb, req.params.object_id)
			.then( ({ list }) => {
				res.json(list)
			})
	}) */

export default routes
