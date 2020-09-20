export enum IotType {
    CUSTOM = 'custom',
    WATCH = 'watch',
    BAND = 'band',
}

export interface IotDevice {
    uuid: string | null
    address: string
    name: string | null
    user_id: number
    type: IotType
    created_at: string
}
