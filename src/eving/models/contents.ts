export interface ContentsRow {
    id: number
    title: string
    description: string
    video: string | null
    video_time: string
    thumbnail: string | null
    author_id: number
    created_at: string
    deleted_at: string | null
}

export interface Contents {
    id: number
    title: string
    description: string
    video: string | null
    video_time: string
    thumbnail: string | null
    author_id: number
    author_email: string
    created_at: string
}

export interface AdsRow {
    id: number
    img: string
    link: string | null
    priority: number
    created_at: string
    expired_at: string | null
}

export interface Ads {
    id: number
    img: string
    link: string | null
}
