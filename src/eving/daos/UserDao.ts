import {User} from "../models/user";
import {BaseDao} from "../../utils/base-dao";
import {DataBase} from "../../utils/dbms";

class UserDao extends BaseDao {
    insertUser(name: string, email: string, pwd: string, role: string = 'common') {
        const queryStr = 'INSERT INTO USER_TB (name, email, pwd, role) VALUES (?, ?, ?, ?)'
        return this.insert(queryStr, [name, email, pwd, role])
    }

    getAllUser(): Promise<User[]> {
        const queryStr = 'SELECT * FROM USER_TB'
        return this.getAll(queryStr)
    }

    getActiveUserById(userId: number): Promise<User | undefined> {
        const queryStr = 'SELECT * FROM USER_TB WHERE id = ? AND status = ?'
        return this.getOne(queryStr, [userId, 'ACTIVE'])
    }

    getActiveUserByEmailPwd(email: string, pwd: string): Promise<User | undefined> {
        const queryStr = 'SELECT * FROM USER_TB WHERE email = ? AND pwd = ? AND status = ?'
        return this.getOne(queryStr, [email, pwd, 'ACTIVE'])
    }
}

export const userDao = new UserDao(DataBase.toName(DataBase.EVING))
