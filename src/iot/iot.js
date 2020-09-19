const express = require('express')
const router = express.Router()

router.get('/devices', (req, res) => {
    const token = req.headers['x-access-token']
    res.send('devices')
})

router.post('/devices', (req, res) => {
    const token = req.headers['x-access-token']
    res.send('devices')
})

router.delete('/devices/:deviceId', (req, res) => {
    const token = req.headers['x-access-token']
    const { deviceId } = req.params
    res.send('devices')
})

module.exports = router
