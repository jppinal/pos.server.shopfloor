import tables from './../api/tables-store'
import orders from './../api/orders-store'
import _uuid from 'uuid/v1'

export const removeBill = (table) => {
	return new Promise((resolve) => {
		tables.get({ _id: table._id }).then((table) => {
			if (!table.bill) resolve(table)
			else {
				tables.update({ _id: table._id }, { bill: undefined }).then(() => {
					table.bill = undefined
					resolve(table)
				})
			}
		})
	})
}

export const assignBill = (table, bill = undefined) => {
	return new Promise((resolve) => {
		tables.get({ _id: table._id }).then((table) => {
			if (!bill)
				if (table.bill) resolve(table)
				else assignBill(table, _uuid())
			else
				tables.update({ _id: table._id }, { bill }).then(() => {
					table.bill = bill
					resolve(table)
				})
		})
	})
}

export const combineBills = (table1, table2) => {
	return new Promise((resolve) => {
		tables.get({ _id: table1._id }).then((table1) => {
			if (!table1.bill) resolve(table1)
			else {
				tables.get({ _id: table2._id }).then((table2) => {
					assignBill(table2, table1.bill).then(() => {
						if (!table2.bill) resolve()
						else orders.update({ bill: table2.bill }, { bill: table1.bill }).then(() => {
							resolve()
						})
					})
				})
			}
		})
	})
}

export const moveBill = (bill, table) => {
	return new Promise((resolve, reject) => {
		if (!bill) reject({ table })
		else
			tables.update({ bill }, { bill: undefined, status: 'free' }).then(() => {
				tables.update({ _id: table._id }, { bill,  status: 'ok' }).then(() => {
					orders.update({ bill }, { table: table._id}).then(() => {
						resolve()
					})
				})
			})
	})
}

export const cancelBill = (bill) => {
	return new Promise((resolve, reject) => {
		if (!bill) reject()
		else
			tables.update({ bill }, { bill: undefined, status: 'free' }).then(() => {
				orders.delete({ bill }).then(() => {
					resolve()
				})
			})
	})
}

export const getBill = (bill) => {
	return new Promise((resolve, reject) => {
		if (!bill) reject()
		else
			tables.find({ bill }).then((ts) => {
				let response = {}
				response[tables] = ts
				orders.find({ bill }).then((os) => {
					response[orders] = os
					resolve(response)
				})
			})
	})
}

export const generateBill = (bill) => {
	return new Promise((resolve, reject) => {
		if (!bill) reject()
		else
			orders.find({ bill }).then((docs) => {
				let lines = docs.reduce((l,o) => {
					if (o.lines) l = [...l, ...o.lines]
					return l
				}, [])
				let total = lines.reduce((acc,line) => {
					acc += line.total.value
					return acc
				}, 0)
				// todo taxes
				resolve({ total, lines })
			})
	})
}
