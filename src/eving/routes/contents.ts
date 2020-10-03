import {Router} from 'express'
import {decodeEvingJwt} from "../../utils/auth";
import {ClientError, ClientErrorType, sendErr} from "../../utils/response-handler";
import {ioTDao} from "../daos/IoTDao";
import {userDao} from "../daos/UserDao";
import {contentsDao} from "../daos/ContentsDao";

const router = Router()

router.get('/',async (req, res) => {
    try {
        const result = await contentsDao.getAllActiveContents()
        res.send({
            code: 200,
            data: result ?? []
        })
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})

export = router
