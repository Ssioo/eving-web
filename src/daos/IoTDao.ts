import {BaseDao} from "./BaseDao";
import {IotDevice} from "../models/iot";

class IoTDao extends BaseDao {
    getAllDeviceByUserId(userId: number): Promise<IotDevice[] | undefined> {
        const queryStr = 'SELECT * FROM IOT_TB WHERE user_id = ?'
        return this.getAll(queryStr, [userId])
    }
}

export const ioTDao = new IoTDao()
