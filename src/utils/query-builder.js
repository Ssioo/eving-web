const pool = require('./dbms')

const query = async (fn) => {
    try {
        const connection = await pool.getConnection(async conn => conn)
        try {
            const result = await fn(connection)
            return result
        } catch (err) {
            connection.release()
            throw new Error(err)
        }
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = query
