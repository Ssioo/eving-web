import { pool } from "./dbms"

export const query = async (fn: any, db: string) => {
    try {
        const connection = await pool[db].getConnection(async conn => conn)
        try {
            return await fn(connection)
        } catch (err) {
            connection.release()
            throw new Error(err)
        } finally {
            connection.release()
        }
    } catch (err) {
        throw new Error(err)
    }
}
