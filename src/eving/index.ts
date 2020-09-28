import {Router} from "express";
import user from "./routes/user";
import iot from "./routes/iot";

const router = Router()

router.use('/users', user)
router.use('/iot', iot)

export = router
