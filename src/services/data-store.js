/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import nedb from 'nedb'
import { head as _head, includes as _includes } from 'lodash'
import chalk from 'chalk'

const fs = require('fs-extra')

const _dblog = (s) => {
	if(process.env.NODE_ENV === 'test') return
	console.log(chalk.gray('[db] ') + ' ' + chalk.gray(s))
}

import { v4 } from 'uuid'

const EventEmitter = require('events')
export class dbEmitter extends EventEmitter {}

class DataStore {

	constructor(path, model) {
		this._EMITTER = new dbEmitter()
		this._MODEL = model
		this._DB = new nedb({ filename: path, autoload: true })
	}

	db() {
		return this._DB()
	}

	save({ document }) {
		return new Promise( (resolve, reject) => {
			/* print action & data */
			_dblog(`Executing ${chalk.bgWhite(' SAVE ')} action.`)
			_dblog(`document:"${JSON.stringify(document, null, 2)}"`)
			/* */
			let data = { ...document, ...this._MODEL }
			let query = { _id: data._id }
			let options = { upsert: true }
			this._DB.update( query, data, options, (err, affectedDocuments) => {
				if(err) {
					_dblog(`${chalk.red('Error')} performing save action.`)
					_dblog(`${err}`)
					reject({ data })
				} else {
					_dblog(`Save action performed ${chalk.green('succesfully')}.`)
					resolve({ response: affectedDocuments })
				}
			})
		})
	}

	update({ query, update, options }) {
		return new Promise( (resolve, reject) => {
			/* print action & data */
			_dblog(`Executing ${chalk.bgWhite(' UPDATE ')} action.`)
			_dblog(`query:"${JSON.stringify(query, null, 2)}"`)
			_dblog(`update:"${JSON.stringify(update, null, 2)}"`)
			_dblog(`options:"${JSON.stringify(options, null, 2)}"`)
			/* */
			this._DB.update( query, update, options, (err, affectedDocuments) => {
				if(err) {
					_dblog(`${chalk.red('Error')} performing save action.`)
					_dblog(`${err}`)
					reject({ update })
				} else {
					_dblog(`Update action performed ${chalk.green('succesfully')}.`)
					resolve({ response: affectedDocuments })
				}
			})
		})
	}

	get({ query }) {
		return new Promise( (resolve, reject) => {
			/* print action & data */
			_dblog(`Executing ${chalk.bgWhite(' GET ')} action.`)
			_dblog(`query:"${JSON.stringify(query, null, 2)}"`)
			/* */
			this._DB.findOne(query, (err, doc) => {
				if(err) {
					_dblog(`${chalk.red('Error')} performing get action.`)
					_dblog(`${err}`)
					reject({ query })
				} else {
					_dblog(`Get action performed ${chalk.green('succesfully')}. ${doc.length} elements were returned.`)
					resolve({ response: doc })
				}
			})
		})
	}

	find({ query }) {
		return new Promise( (resolve, reject) => {
			/* print action & data */
			_dblog(`Executing ${chalk.bgWhite(' FIND ')} action.`)
			_dblog(`query:"${JSON.stringify(query, null, 2)}"`)
			/* */
			this._DB.find(query, (err, docs) => {
				if(err) {
					_dblog(`${chalk.red('Error')} performing get action.`)
					_dblog(`${err}`)
					reject({ query })
				} else {
					_dblog(`Get action performed ${chalk.green('succesfully')}. ${docs.length} elements were returned.`)
					resolve({ response: docs })
				}
			})
		})
	}

	delete({ query, options }) {
		return new Promise( (resolve, reject) => {
			/* print action & data */
			_dblog(`Executing ${chalk.bgWhite(' DELETE ')} action.`)
			_dblog(`query:"${JSON.stringify(query, null, 2)}"`)
			_dblog(`options:"${JSON.stringify(options, null, 2)}"`)
			/* */
			this._DB.remove(query, options, (err, numRemoved) => {
				if(err) {
					_dblog(`${chalk.red('Error')} performing delete action.`)
					_dblog(`${err}`)
					reject({ query })
				} else {
					_dblog(`Delete action performed ${numRemoved} times ${chalk.green('succesfully')}.`)
					resolve({ response: numRemoved })
				}
			})
		})
	}

}

export default DataStore
