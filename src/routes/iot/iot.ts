import { Router } from 'express'
import {decodeJwt} from "../../utils/auth";
import {sendErr} from "../../utils/response-handler";
import {ioTDao} from "../../daos/IoTDao";

const router = Router()

router.get('/devices', async (req, res) => {
    try {
        const { userId } = decodeJwt(req)
        const deviceList = await ioTDao.getAllDeviceByUserId(userId)
        res.send({
            code: 200,
            data: deviceList ?? []
        })
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})

router.post('/devices', (req, res) => {

    res.send('devices')
})

router.delete('/devices/:deviceId', (req, res) => {
    const token = req.headers['x-access-token']
    const { deviceId } = req.params
    res.send('devices')
})

export = router
