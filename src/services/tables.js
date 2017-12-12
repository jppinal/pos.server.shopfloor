import tables from './../api/tables-store'
import { assignBill, removeBill } from './bills'

const changeStatus = (status, table) => {
	return new Promise((resolve) => {
		tables.get({ _id: table._id }).then((table) => {
			tables.update({ _id: table._id }, { status }).then(() => {
				table.status = status
				resolve(table)
			})
		})
	})
}

export const toFree = (table) => {
	return changeStatus('free', table).then((table) => {
		return removeBill(table)
	})
}

export const toPending = (table) => {
	return changeStatus('pending', table).then((table) => {
		return assignBill(table)
	})
}

export const toOk = (table) => {
	return changeStatus('ok', table)
}

export const toPaying = (table) => {
	return changeStatus('paying', table)
}
