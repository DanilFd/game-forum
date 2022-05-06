import {EditorData} from "./EditorData";

export type CreateBlogRequest = {
    title: string
    content: EditorData
    img: FileList
}