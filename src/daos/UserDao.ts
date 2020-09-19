import { BaseDao } from './BaseDao'

class UserDao extends BaseDao {
    insertUser(name: string, email: string, pwd: string, role: string = 'common') {
        const queryStr = 'INSERT INTO USER_TB (name, email, pwd, role) VALUES (?, ?, ?, ?)'
        return this.insert(queryStr, [name, email, pwd, role])
    }

    getAllUser() {
        const queryStr = 'SELECT * FROM USER_TB'
        return this.getAll(queryStr)
    }
}

export const userDao = new UserDao()
