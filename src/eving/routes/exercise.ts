import {Router} from 'express'
import {decodeEvingJwt} from "../../utils/auth";
import {ClientError, ClientErrorType, sendErr} from "../../utils/response-handler";
import {userDao} from "../daos/UserDao";
import {exerciseDao} from "../daos/ExerciseDao";

const router = Router()

router.get('/', async (req, res) => {
    try {
        const { userId } = decodeEvingJwt(req)
        const isUserValid = await userDao.getActiveUserById(userId)
        if (!isUserValid) throw new ClientError(ClientErrorType.NO_DATA)
        const result = await exerciseDao.getAllExercisesSummaryByUserId(userId)
        res.send({
            code: 200,
            data: result ?? []
        })
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})

router.post('/', async (req, res) => {
    try {
        const { userId } = decodeEvingJwt(req)
        const isUserValid = await userDao.getActiveUserById(userId)
        if (!isUserValid) throw new ClientError(ClientErrorType.NO_DATA)
        const result = await exerciseDao.createNewExercise(userId, null)
        res.send({
            code: 200,
            data: {
                exerciseId: result
            }
        })
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})

router.post('/data/:exerciseId',async (req, res) => {
    try {
        const { userId } = decodeEvingJwt(req)
        const { exerciseId } = req.params
        const { sensors, avgAcc, avgGyro, avgTilt } = req.body
        const isUserValid = await userDao.getActiveUserById(userId)
        if (!isUserValid) throw new ClientError(ClientErrorType.NO_DATA)
        if (!exerciseId) throw new ClientError(ClientErrorType.MISSING_PARAMS)
        await sensors.reduce(async (acc, item, idx) => {
            let promise = await acc.then()
            const queryRes = await exerciseDao.createNewExerciseSensorData(Number(exerciseId), item, idx)
            return Promise.resolve([...promise, queryRes])
        }, Promise.resolve([]))
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

router.get('/data/:exerciseId', async (req, res) => {
    try {
        const { userId } = decodeEvingJwt(req)
        const isUserValid = await userDao.getActiveUserById(userId)
        if (!isUserValid) throw new ClientError(ClientErrorType.NO_DATA)
        const { exerciseId } = req.params
        if (!exerciseId) throw new ClientError(ClientErrorType.MISSING_PARAMS)
        const result = await exerciseDao.getExerciseDataByExerciseId(Number(exerciseId), userId);
        res.send({
            code: 200,
            data: result ?? []
        })
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})

router.put('/title/:exerciseId', async (req, res) => {
    try {
        const { userId } = decodeEvingJwt(req)
        const isUserValid = await userDao.getActiveUserById(userId)
        if (!isUserValid) throw new ClientError(ClientErrorType.NO_DATA)
        const { exerciseId } = req.params
        const { title } = req.body
        if (!exerciseId || !title) throw new ClientError(ClientErrorType.MISSING_PARAMS)
        await exerciseDao.setExerciseTitle(title, Number(exerciseId))
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

router.delete('/:exerciseId', async (req, res) => {
    try {
        const { userId } = decodeEvingJwt(req)
        const isUserValid = await userDao.getActiveUserById(userId)
        if (!isUserValid) throw new ClientError(ClientErrorType.NO_DATA)
        const { exerciseId } = req.params
        if (!exerciseId) throw new ClientError(ClientErrorType.MISSING_PARAMS)
        await exerciseDao.deleteExercise(Number(exerciseId), userId)
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
