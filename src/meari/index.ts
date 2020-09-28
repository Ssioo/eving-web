import {Router} from "express";
import piece from "./routes/masterpiece";
import sound from "./routes/sound";

const router = Router()

router.use('/pieces', piece)
router.use('/sounds', sound)

export = router
