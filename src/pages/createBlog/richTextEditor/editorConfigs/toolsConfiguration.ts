// @ts-ignore
import Quote from '@editorjs/quote';
// @ts-ignore
import Embed from '@editorjs/embed';
// @ts-ignore
import NestedList from '@editorjs/nested-list';
// @ts-ignore
import ImageTool from '@editorjs/image';

const URL_BY_FILE = 'https://react-bac.herokuapp.com/api/blogs/upload-img/'
export const toolsConfiguration = {
    list: {
        class: NestedList,
        inlineToolbar: true,
    },
    embed: {
        class: Embed,
        inlineToolbar: true,
        config: {
            defaultStyle: 'unordered'
        }
    },
    image: {
        class: ImageTool,
        config: {
            endpoints: {
                byFile: URL_BY_FILE,
            },
            captionPlaceholder:'Подпись к картинке'
        }
    },
    quote: {
        class: Quote,
        inlineToolbar: true,
        config: {
            quotePlaceholder: 'Введите цитату',
            captionPlaceholder: 'Автор цитаты',
        },
    },
}