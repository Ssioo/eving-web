import {userDao} from '../../daos/UserDao'
import {Router} from 'express'
import {encodeJwt} from '../../utils/auth'
import {ClientError, ClientErrorType, sendErr, sendRes} from '../../utils/response-handler'


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
        const { name, email, pwd } = req.body
        if (/^[A-Za-zㄱ-ㅎㅏ-ㅣ가-힣]{4,20}$/.exec(name) || /^[A-Za-z0-9]{6,12}$/.exec(email) || /^[A-Za-z0-9]{8,20}/)
            throw new ClientError(ClientErrorType.INVALID_DATA)
        const result = await userDao.getActiveUserByEmailPwd(email, pwd)
        if (result) throw new ClientError(ClientErrorType.DUPLICATE)
        await userDao.insertUser(name, email, pwd)
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

router.post('/token', async (req, res) => {
    try {
        const { email, pwd } = req.body
        if (typeof email !== 'string' || typeof pwd !== 'string') throw new ClientError(ClientErrorType.MISSING_PARAMS)
        const result = await userDao.getActiveUserByEmailPwd(email, pwd)
        if (!result) throw new ClientError(ClientErrorType.NO_DATA)
        res.send({
            code: 200,
            data: {
                token: encodeJwt({ userId: result.id })
            }
        })
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})

export = router
