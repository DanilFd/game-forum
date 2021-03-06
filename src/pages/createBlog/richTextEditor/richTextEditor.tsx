import EditorJS from "@editorjs/editorjs";
import {useEffect, useRef} from "react";
import {toolsConfiguration} from "./editorConfigs/toolsConfiguration";
import {internationalizationConfiguration} from "./editorConfigs/internationalizationConfiguration";
import {SetState} from "../../../types/utils/utils";

type Props = {
    onChange: any
    value: any
    isClearEditor: boolean
    setIsClearEditor: SetState<boolean>
}
const EDITOR_HOLDER_ID = 'editorjs';
const RichTextEditor = ({onChange, value, isClearEditor, setIsClearEditor}: Props) => {
    const isInstance = useRef<EditorJS | null>(null)
    useEffect(() => {
        if (!isInstance.current)
            initEditor()
        return () => {
            if (isInstance.current) {
                isInstance.current.destroy()
                isInstance.current = null;
            }
        }
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (isClearEditor) {
            isInstance.current?.blocks.clear()
            setIsClearEditor(false)
        }
        // eslint-disable-next-line
    }, [isClearEditor])
    const initEditor = () => {
        const editor = new EditorJS({
            holder: EDITOR_HOLDER_ID,
            onReady: () => {
                isInstance.current = editor
            },
            onChange: () => {
                contents().then()
            },
            minHeight: 30,
            placeholder: 'Нажмите Tab для выбора инструмента',
            tools: {
                ...toolsConfiguration,
            },
            i18n: {
                ...internationalizationConfiguration
            },
            data: value
        })

        async function contents() {
            const output = await editor.save()
            onChange(output)
        }
    }
    return (
        <div>
            <div id={EDITOR_HOLDER_ID}/>
        </div>

    )
};
export default RichTextEditor
