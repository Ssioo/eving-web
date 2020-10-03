import {Router} from 'express'
import {decodeEvingJwt} from "../../utils/auth";
import {ClientError, ClientErrorType, sendErr} from "../../utils/response-handler";
import {ioTDao} from "../daos/IoTDao";
import {userDao} from "../daos/UserDao";

const router = Router()

router.get('/devices', async (req, res) => {
    try {
        const { userId } = decodeEvingJwt(req)
        const deviceList = await ioTDao.getAllActiveDeviceByUserId(userId)
        res.send({
            code: 200,
            data: deviceList ?? []
        })
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})

router.post('/devices', async (req, res) => {
    try {
        const { userId } = decodeEvingJwt(req)
        const { uuid, address, name, type } = req.body
        const isUserValid = await userDao.getActiveUserById(userId)
        if (!isUserValid) throw new ClientError(ClientErrorType.NO_DATA)
        const result = await ioTDao.insertDevice(userId, uuid, address, name, type)
        if (!result) throw new ClientError(ClientErrorType.INVALID_DATA)
        res.send({
            code: 200,
            data: {
                result: 'success'
            }
        })
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})

router.delete('/devices/:deviceId', async(req, res) => {
    try {
        const { userId } = decodeEvingJwt(req)
        const { deviceId } = req.params
        const isUserValid = await userDao.getActiveUserById(userId)
        if (!isUserValid) throw new ClientError(ClientErrorType.NO_DATA)
        const result = await ioTDao.deleteDeviceById(Number(deviceId))
        res.send({
            code: 200,
            data: {
                result: 'success'
            }
        })
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})

export = router
