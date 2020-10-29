import {UserRow} from "../models/user";
import {BaseDao} from "../../utils/base-dao";
import {DataBase} from "../../utils/dbms";

class UserDao extends BaseDao {
    insertUser(email: string, pwd: string, gender: 1 | 2, role: string = 'common') {
        const queryStr = 'INSERT INTO USER_TB (email, pwd, gender, role) VALUES (?, ?, ?, ?)'
        return this.insert(queryStr, [email, pwd, gender, role])
    }

    getAllUser(): Promise<UserRow[]> {
        const queryStr = 'SELECT * FROM USER_TB'
        return this.getAll(queryStr)
    }

    getUserInfo(userId: number): Promise<UserRow> {
        const queryStr = 'SELECT * FROM USER_TB WHERE id = ? AND deleted_at IS NULL'
        return this.getOne(queryStr, [userId])
    }

    getActiveUserById(userId: number): Promise<UserRow | undefined> {
        const queryStr = 'SELECT * FROM USER_TB WHERE id = ? AND status = ?'
        return this.getOne(queryStr, [userId, 'ACTIVE'])
    }

    getActiveUserByEmailPwd(email: string, pwd: string): Promise<UserRow | undefined> {
        const queryStr = 'SELECT * FROM USER_TB WHERE email = ? AND pwd = ? AND status = ?'
        return this.getOne(queryStr, [email, pwd, 'ACTIVE'])
    }

    getActiveUserByEmail(email: string): Promise<UserRow | undefined> {
        const queryStr = 'SELECT * FROM USER_TB WHERE email = ? AND status = ?'
        return this.getOne(queryStr, [email, 'ACTIVE'])
    }

    setUserInactive(userId: number) {
        const queryStr = 'UPDATE USER_TB SET status = "INACTIVE", deleted_at = NOW() ' +
            'WHERE id = ? AND deleted_at IS NULL'
        return this.update(queryStr, [userId])
    }
}

export const userDao = new UserDao(DataBase.toName(DataBase.EVING))
