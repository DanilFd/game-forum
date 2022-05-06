export type DataBlock = {
    id: string
    type: string
    data: any
}
export type EditorData = {
    time: number
    blocks: DataBlock[]
    version: string
}