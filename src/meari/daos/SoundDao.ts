import {BaseDao} from "../../utils/base-dao";
import {DataBase} from "../../utils/dbms";
import {Sound} from "../models/sound";

class SoundDao extends BaseDao {
    async getAllSounds(): Promise<Sound[] | undefined> {
        const queryStr = 'SELECT * FROM SOUND_TB'
        return this.getAll(queryStr)
    }
}

export const soundDao = new SoundDao(DataBase.toName(DataBase.MEARI))
