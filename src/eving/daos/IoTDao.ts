import { BaseDao } from "../../utils/base-dao";
import {IotDevice} from "../models/iot";
import {DataBase} from "../../utils/dbms";

class IoTDao extends BaseDao {
    getAllDeviceByUserId(userId: number): Promise<IotDevice[] | undefined> {
        const queryStr = 'SELECT * FROM IOT_TB WHERE user_id = ?'
        return this.getAll(queryStr, [userId])
    }
}

export const ioTDao = new IoTDao(DataBase.toName(DataBase.EVING))
