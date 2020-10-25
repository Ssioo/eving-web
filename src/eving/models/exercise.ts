export interface Exercise {
    id: number
    title: string | null
    count: number
    speed: number
    horizontalScore: number
    verticalScore: number
    createdAt: string
}

export interface ExerciseDataRow {
    acc_x: number
    acc_y: number
    acc_z: number
    gyro_x: number
    gyro_y: number
    gyro_z: number
    tilt: number
    set_idx: number
}
