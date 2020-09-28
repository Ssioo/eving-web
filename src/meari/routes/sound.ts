import {Router} from "express";
import {sendErr} from "../../utils/response-handler";
import {soundDao} from "../daos/SoundDao";

const router = Router()

router.get('/', async (req, res) => {
    try {
        const result = await soundDao.getAllSounds()
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
