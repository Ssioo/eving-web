import { userDao } from '../../daos/UserDao'
import { Router } from 'express'


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
        res.send({
            code: 500,
            msg: 'Fail to get users',
        })
    }
})

router.post('/', async (req, res) => {
    try {
        const { name, email, pwd } = req.params
        const result = await userDao.insertUser(name, email, pwd)
        res.send({
            code: 200,
            data: result
        })
    } catch (e) {
        console.log(e)
        res.send({
            code: 500,
            msg: 'User Post Error',
        })
    }
})

export = router
