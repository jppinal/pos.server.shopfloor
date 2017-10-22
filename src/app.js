/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

import routes from './routes'

import chalk from 'chalk'

export const _applog = (s) => {
	console.log(chalk.cyan('[app]') + ' ' + chalk.cyan(s))
}

const app = express()

// View engine setup
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../public')))

// Routes
//app.use('/', routes)

// Set up our services (see `services/index.js`)
app.use('/', routes)

// Catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found')
	err.status = 404
	next(err)
})

// Error handler
app.use((err, req, res, next) => {
	res
		.status(err.status || 500)
		.render('error', {
			message: err.message
		})
})

export default app
