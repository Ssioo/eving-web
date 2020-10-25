import {Router} from "express";
import user from "./routes/user";
import iot from "./routes/iot";
import contents from "./routes/contents"
import exercises from './routes/exercise'

const router = Router()

router.use('/users', user)
router.use('/iot', iot)
router.use('/contents', contents)
router.use('/exercises', exercises)

export = router
