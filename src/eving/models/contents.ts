export interface ContentsRow {
    id: number
    title: string
    desc: string
    video: string | null
    video_time: string
    thumbnail: string | null
    author_id: number
    created_at: string
    deleted_at: string | null
}
