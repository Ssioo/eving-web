import {Router} from "express";
import {sendErr} from "../../utils/response-handler";
import {soundDao} from "../daos/SoundDao";
import {colorDao} from "../daos/ColorDao";
import {allColors, Color, SoundNamedColor} from "../models/color";

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

router.get('/colors', async (req, res) => {
    try {
        const labeledDataset = await colorDao.getAllSoundedColors()
        const result = allColors().map((color) => {
            return {
                hex: color.hex,
                sound: labeledDataset?.map((item) => ({
                    data: item,
                    dist: Color.distanceBetween(item, color)
                }))
                    .reduce(
                        (prev, cur) => prev.dist < cur.dist ? prev : cur
                    )
                    .data.sound
            }
        })
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
