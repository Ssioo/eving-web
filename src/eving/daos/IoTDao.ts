import { BaseDao } from "../../utils/base-dao";
import {IotDeviceRow, IotType, MyIotDevice} from "../models/iot";
import {DataBase} from "../../utils/dbms";

class IoTDao extends BaseDao {
    getAllActiveDeviceByUserId(userId: number): Promise<MyIotDevice[] | undefined> {
        const queryStr = 'SELECT id, uuid, address, name, type, created_at FROM IOT_TB WHERE user_id = ? AND deleted_at IS NULL'
        return this.getAll(queryStr, [userId])
    }

    insertDevice(userId: number, uuid: string | null, address: string, name: string | null, type: IotType) {
        const queryStr = 'INSERT INTO IOT_TB (uuid, address, name, user_id, type) VALUES (?, ?, ?, ?, ?)'
        return this.insert(queryStr, [uuid, address, name, userId, type])
    }

    getDeviceById(deviceId: number): Promise<IotDeviceRow | undefined> {
        const queryStr = 'SELECT * FROM IOT_TB WHERE id = ?'
        return this.getOne(queryStr, [deviceId])
    }

    deleteDeviceById(deviceId: number) {
        const queryStr = 'UPDATE IOT_TB SET deleted_at = NOW() WHERE id = ?'
        return this.delete(queryStr, [deviceId])
    }
}

export const ioTDao = new IoTDao(DataBase.toName(DataBase.EVING))
