/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { v4 } from 'uuid'
import { head as _head, slice as _slice, groupBy as _groupBy, mapKeys as _mapKeys, values as _values } from 'lodash'
import DataStore from './data-store'

export const _uid = (t) => {
	if(t && process.env.NODE_ENV === 'test') return `test-${t}-object`
	return v4()
}

class Service extends DataStore {

	constructor(t, model, path) {
		super(path, model)
		this._TYPE = t
	}

	model() {
		return this._MODEL()
	}

}

export default Service
