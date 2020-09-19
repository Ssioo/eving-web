import { query } from "../utils/query-builder"

export class BaseDao {
    getOne (queryString: string, args: any[] = []) {
        return query(async (conn: any) => {
            const [rows] = await conn.query(queryString, args)
            return rows[0]
        })
    }

    getAll (queryString: string, args: any[] = []) {
        return query(async (conn: any) => {
            const [rows] = await conn.query(queryString, args)
            return rows
        })
    }

    insert (queryString: string, args: any[] = []) {
        return query(async (conn: any) => {
            const [obj] = await conn.query(queryString, args)
            return obj.insertId
        })
    }

    update (queryString: string, args: any[] = []) {
        return query(async (conn: any) => {
            await conn.query(queryString, args)
        })
    }

    delete (queryString: string, args = []) {
        return query(async (conn: any) => {
            await conn.query(queryString, args)
        })
    }
}
