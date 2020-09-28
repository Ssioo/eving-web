import { Router } from "express";
import {sendErr, sendRes} from "../../utils/response-handler";
import {masterPieceDao} from "../daos/MasterPieceDao";

const router = Router()

router.get('/', async (req, res) => {
    try {
        const result = await masterPieceDao.getAllPieces()
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
