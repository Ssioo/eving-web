import {BaseDao} from "../../utils/base-dao";
import {Exercise, ExerciseDataRow} from "../models/exercise";
import {DataBase} from "../../utils/dbms";

class ExerciseDao extends BaseDao {

    getAllExercisesSummaryByUserId(userId: number): Promise<Exercise[] | undefined> {
        const queryStr = 'SELECT * FROM EXERCISE_TB WHERE user_id = ? AND deleted_at IS NULL'
        return this.getAll(queryStr, [userId])
    }

    getExerciseDataByExerciseId(exId: number, userId: number): Promise<ExerciseDataRow[] | undefined> {
        const queryStr = 'SELECT acc_x, acc_y, acc_z, gyro_x, gyro_y, gyro_z, mag_x, mag_y, mag_z, tilt, set_idx ' +
            'FROM EXERCISE_DATA_TB AS D LEFT JOIN EXERCISE_TB AS E ON D.exercise_id = E.id ' +
            'WHERE E.id = ? AND E.deleted_at IS NULL AND E.user_id = ?'
        return this.getAll(queryStr, [exId, userId])
    }

    createNewExercise(userId: number, title: string | null): Promise<number> {
        const queryStr = 'INSERT INTO EXERCISE_TB (title, user_id) VALUES (?, ?)'
        return this.insert(queryStr, [title, userId])
    }

    createNewExerciseSensorData(exerciseId: number, sensors: Array<number[]>, setIdx: number) {
        const queryStr = 'INSERT INTO EXERCISE_DATA_TB ' +
            '(exercise_id, acc_x, acc_y, acc_z, gyro_x, gyro_y, gyro_z, tilt, mag_x, mag_y, mag_z, set_idx) ' +
            'VALUES ?'
        return this.insert(queryStr, [sensors.map((item) => [exerciseId, ...item, setIdx])])
    }
}

export const exerciseDao = new ExerciseDao(DataBase.toName(DataBase.EVING))
