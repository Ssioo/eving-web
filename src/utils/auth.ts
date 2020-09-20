import jwt from 'jsonwebtoken'
import { JwtPayload, JwtCustomPayload } from '../models/auth'
import moment from "moment";
import {Request} from "express";
import {ClientError, ClientErrorType} from "./response-handler";

export const encodeJwt = (payload: JwtCustomPayload): string => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: '14d'
        })
}

export const decodeJwt = (req: Request): JwtCustomPayload => {
    try {
        const decoded: JwtPayload = jwt.verify(req.headers['x-access-token'], process.env.JWT_SECRET)
        if (moment(decoded.exp).isAfter(moment())) throw new ClientError(ClientErrorType.TOKEN_EXPIRED)
        return { userId: decoded.userId }
    } catch (e) {
        throw new ClientError(e.message)
    }
}
