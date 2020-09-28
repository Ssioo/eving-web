import { query } from "./query-builder"

export class BaseDao {
    private readonly db: string
    constructor(db: string) {
        this.db = db
    }

    protected getOne (queryString: string, args: any[] = []) {
        return query(async (conn: any) => {
            const [rows] = await conn.query(queryString, args)
            return rows[0]
        }, this.db)
    }

    protected getAll (queryString: string, args: any[] = []) {
        return query(async (conn: any) => {
            const [rows] = await conn.query(queryString, args)
            return rows
        }, this.db)
    }

    protected insert (queryString: string, args: any[] = []) {
        return query(async (conn: any) => {
            const [obj] = await conn.query(queryString, args)
            return obj.insertId
        }, this.db)
    }

    protected update (queryString: string, args: any[] = []) {
        return query(async (conn: any) => {
            await conn.query(queryString, args)
        }, this.db)
    }

    protected delete (queryString: string, args = []) {
        return query(async (conn: any) => {
            await conn.query(queryString, args)
        }, this.db)
    }
}
