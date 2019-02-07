import * as express from "express"
const router = express.Router()
import * as LitecoinController from '../controllers/litecoin.controller'

router.get("/generateAddress/:userId", LitecoinController.GenerateAddress.validations, LitecoinController.GenerateAddress.handler)

export default router