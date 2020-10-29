import {userDao} from '../daos/UserDao'
import {Router} from 'express'
import {decodeEvingJwt, encodeEvingJwt} from '../../utils/auth'
import {ClientError, ClientErrorType, sendErr} from '../../utils/response-handler'


const router = Router()

router.get('/', async (req, res) => {
    try {
        const result = await userDao.getAllUser()
        res.send({
            code: 200,
            data: result,
        })
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})

router.post('/', async (req, res) => {
    try {
        const { email, pwd, gender } = req.body
        if (!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/.exec(email)
            || !/^[A-Za-z0-9]{4,20}$/.exec(pwd)
            || !/^[12]$/.exec(gender)
        )
            throw new ClientError(ClientErrorType.INVALID_DATA)
        const result = await userDao.getActiveUserByEmail(email)
        if (result) throw new ClientError(ClientErrorType.DUPLICATE)
        await userDao.insertUser(email, pwd, gender)
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

router.get('/info', async (req, res) => {
    try {
        const { userId } = decodeEvingJwt(req)
        const result = await userDao.getUserInfo(userId)
        if (!result) throw new ClientError(ClientErrorType.NO_DATA)
        res.send({
            code: 200,
            data: result
        })
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})

router.post('/token', async (req, res) => {
    try {
        const { email, pwd } = req.body
        if (typeof email !== 'string' || typeof pwd !== 'string') throw new ClientError(ClientErrorType.MISSING_PARAMS)
        const result = await userDao.getActiveUserByEmailPwd(email, pwd)
        if (!result) throw new ClientError(ClientErrorType.NO_DATA)
        res.send({
            code: 200,
            data: {
                token: encodeEvingJwt({ userId: result.id })
            }
        })
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})

router.get('/token/verify', async (req, res) => {
    try {
        const { userId } = decodeEvingJwt(req)
        const result = await userDao.getActiveUserById(userId)
        if (!result) throw new ClientError(ClientErrorType.NO_DATA)
        res.send({
            code: 200,
            data: {
                success: true
            }
        })
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})

router.delete('/', async (req, res) => {
    try {
        const { userId } = decodeEvingJwt(req)
        const result = await userDao.setUserInactive(userId)
        res.send({
            code: 200,
            data: {
                success: true
            }
        })
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})

export = router
