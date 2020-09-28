const mysql = require('mysql2/promise')

require('dotenv').config()

export const pool = {
    Eving: mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME_EVING,
        multipleStatements: true,
        connectionLimit: 80
    }),
    Meari: mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME_MEARI,
        multipleStatements: true,
        connectionLimit: 80
    })
}

export enum DataBase {
    EVING,
    MEARI
}

export namespace DataBase {
    export const toName = (db: DataBase): string => {
        switch (db) {
            case DataBase.EVING:
                return process.env.DB_NAME_EVING!!
            case DataBase.MEARI:
                return process.env.DB_NAME_MEARI!!
        }
    }
}
