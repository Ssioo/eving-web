const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

require('dotenv').config()

const app = express()

const user = require('./user/user')
const iot = require('./iot/iot')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'content-type, x-access-token')
    next()
})

app.use('/users', user)
app.use('/iot', iot)

/// catch 404 and forwarding to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

/// error handlers

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'development') {
    app.use((err, req, res, next) => {
        console.log(err.stack)
        //res.sendStatus(err.status || 500)
    })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    //res.sendStatus(err.status || 500)
})

app.listen(process.env.PORT, () => {
    //logCollector.emit('restart', { ip: ip.address() })
})

module.exports = app
