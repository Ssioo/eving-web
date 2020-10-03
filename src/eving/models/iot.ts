export enum IotType {
    CUSTOM = 'custom',
    WATCH = 'watch',
    BAND = 'band',
}

export interface MyIotDevice {
    id: number
    uuid: string | null
    address: string
    name: string | null
    type: IotType
    created_at: string
}

export interface IotDeviceRow {
    id: number
    uuid: string | null
    address: string
    name: string | null
    user_id: number
    type: IotType
    created_at: string
    deleted_at: string
}
