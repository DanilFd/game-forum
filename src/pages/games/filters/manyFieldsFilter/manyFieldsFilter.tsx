import {useFieldArray} from "react-hook-form";
import {DropDownList} from "../../../../components/dropDownList/dropDownList";
import {GenreType} from "../../../../types/Games/GenreType";
import styles from "./manyFieldsFilter.module.scss"
import {AiOutlineClose, AiOutlinePlus} from "react-icons/all";

type Props = {
    control: any
    items: GenreType[]
    register: any
    collectionName: string
    defaultItemText: string
}

export const ManyFieldsFilter = ({control, items, register, collectionName, defaultItemText}: Props) => {
    const {fields, append, remove} = useFieldArray({
        control,
        name: collectionName
    })
    return (
        <div className={styles.list}>
            {fields.map(({id}, index) => {
                return (
                    <div className={styles.filter} key={id}>
                        <DropDownList defaultItemText={defaultItemText} items={items}
                                      selectProps={{...register(`${collectionName}[${index}].item`)}}/>
                        {index !== 0 &&
                        <span className={styles.close} onClick={() => remove(index)}><AiOutlineClose/></span>}
                    </div>
                )
            })}
            <div className={styles.append} onClick={() => append({item: ''})}>
                <span>ДОБАВИТЬ ЕЩЕ</span>
                <AiOutlinePlus/>
            </div>
        </div>
    )
}
