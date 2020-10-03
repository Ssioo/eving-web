import {BaseDao} from "../../utils/base-dao";
import {DataBase} from "../../utils/dbms";
import {ContentsRow} from "../models/contents";

class ContentsDao extends BaseDao {
    getAllActiveContents(): Promise<ContentsRow[] | undefined> {
        const queryStr = 'SELECT * FROM CONTENTS_TB WHERE deleted_at IS NULL'
        return this.getAll(queryStr)
    }
}

export const contentsDao = new ContentsDao(DataBase.toName(DataBase.EVING))
