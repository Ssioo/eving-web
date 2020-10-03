import {Router} from "express";
import user from "./routes/user";
import iot from "./routes/iot";
import contents from "./routes/contents"

const router = Router()

router.use('/users', user)
router.use('/iot', iot)
router.use('/contents', contents)

export = router
