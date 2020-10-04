import {BaseDao} from "../../utils/base-dao";
import {DataBase} from "../../utils/dbms";
import {Color, SoundNamedColor} from "../models/color";

class ColorDao extends BaseDao {
    getAllSoundedColors(): Promise<SoundNamedColor[] | undefined> {
        const queryStr = 'SELECT * FROM COLOR_TB'
        return this.getAll(queryStr)
    }
}

export const colorDao = new ColorDao(DataBase.toName(DataBase.MEARI))
