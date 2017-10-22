/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const configuration = require('../config/default.json')

import app, { _applog } from './app'
const PORT = configuration.port
app.listen(PORT, () => _applog(`Listening on port ${PORT}`))

import io, { _iolog } from './io'
const IOPORT = configuration.ioport
io.listen(IOPORT)
_iolog(`Websockets service listening on port ${IOPORT}`)

export default app
