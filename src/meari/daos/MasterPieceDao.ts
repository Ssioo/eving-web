import {BaseDao} from "../../utils/base-dao";
import {DataBase} from "../../utils/dbms";
import {Masterpiece} from "../models/masterpiece";

class MasterPieceDao extends BaseDao {
    async getAllPieces(): Promise<Masterpiece[] | undefined> {
        const queryStr = 'SELECT * FROM PIECE_TB'
        return this.getAll(queryStr)
    }
}

export const masterPieceDao = new MasterPieceDao(DataBase.toName(DataBase.MEARI))
