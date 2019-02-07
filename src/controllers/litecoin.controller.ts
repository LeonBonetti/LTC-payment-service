import { Request, Response } from 'express'
import { Endpoint } from '../typings/global';
import { check, validationResult } from 'express-validator/check';
import * as ltc_model from '../models/litecoin.models'

export const GenerateAddress: Endpoint = {
    validations:[
        check('userId').isLength({min:10})
    ],
    handler: async (req: Request, res: Response) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try {
            const newAddress = await ltc_model.getNewAddress()
            
            // save on database

            res.status(200).send(newAddress)
        } catch (error) {
            // response error to client
            res.status(500).send(error)    
        }

    }
}