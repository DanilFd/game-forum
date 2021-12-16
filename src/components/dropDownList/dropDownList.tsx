import styles from "./dropDownList.module.scss"

type Props = {
    defaultItemText?: string
    items:
        {
            id: number,
            title: string
            slug?:string
            value?:string
        }[]
    selectProps: object
}
export const DropDownList = ({defaultItemText, items, selectProps}: Props) => {
    return (
        <div>
            <label className={styles.select} htmlFor="select">
                <select {...selectProps}>
                    {defaultItemText && <option key={defaultItemText} value="">{defaultItemText}</option>}
                    {items.map(item => <option key={item.id} value={item.slug}>{item.title}</option>)}
                </select>
                <svg>
                    <use xlinkHref="#select-arrow-down"/>
                </svg>
            </label>
            <svg className={styles.sprites}>
                <symbol id="select-arrow-down" viewBox='0 0 10 6'>
                    <polyline points="1 1 5 5 9 1"/>
                </symbol>
            </svg>
        </div>
    );
};

