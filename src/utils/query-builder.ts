import { pool } from './dbms'

export const query = async (fn: any) => {
    try {
        const connection = await pool.getConnection(async conn => conn)
        try {
            return await fn(connection)
        } catch (err) {
            connection.release()
            throw new Error(err)
        }
    } catch (err) {
        throw new Error(err)
    }
}
