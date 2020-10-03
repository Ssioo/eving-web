import {BaseDao} from "../../utils/base-dao";
import {DataBase} from "../../utils/dbms";
import {Contents} from "../models/contents";

class ContentsDao extends BaseDao {
    getAllActiveContents(): Promise<Contents[] | undefined> {
        const queryStr = 'SELECT C.id, C.title, C.description, C.video, C.video_time, C.thumbnail, C.author_id, U.email AS author_email, C.created_at ' +
            'FROM CONTENTS_TB AS C ' +
            'LEFT JOIN USER_TB AS U ON U.id = C.author_id ' +
            'WHERE C.deleted_at IS NULL'
        return this.getAll(queryStr)
    }
}

export const contentsDao = new ContentsDao(DataBase.toName(DataBase.EVING))
