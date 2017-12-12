import rooms from './../api/rooms-store'
import tables from './../api/tables-store'

export const getRooms = () => {
	return new Promise((resolve) => {
		tables.find({}).then((t) => {
			rooms.find({}).then((r) => {
				let response = r.map((room) => {
					room.tables = t.filter(table => table.room === room._id)
					return room
				})
				resolve(response)
			})
		})
	})
}
