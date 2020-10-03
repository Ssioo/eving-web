export enum Role {
    COMMON = 'common',
    ADMIN = 'admin',
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    BANNED = 'BANNED',
}

export interface User {
    id: number
    email: string
    pwd: string
    gender: 1 | 2
    role: Role
    status: UserStatus
    created_at: string
}

export interface UserRow {
    id: number
    email: string
    pwd: string
    gender: 1 | 2
    role: Role
    status: UserStatus
    created_at: string
    deleted_at: string | null
}
