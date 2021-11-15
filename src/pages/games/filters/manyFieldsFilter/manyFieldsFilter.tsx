import {useFieldArray} from "react-hook-form";
import {DropDownList} from "../../../../components/dropDownList/dropDownList";
import {GenreType} from "../../../../types/Games/GenreType";

type Props = {
    control: any
    items: GenreType[]
    register: any
}

export const ManyFieldsFilter = ({control, items, register}: Props) => {
    const {fields, append, remove} = useFieldArray({
        control,
        name: "items"
    })
    return (
        <div>
            {fields.map(({id}, index) => {
                return (
                    <DropDownList key={id} defaultItemText="Все жанры" items={items}
                                  selectProps={{...register(`items[${index}].genre`)}}/>
                )
            })}
            <button type="button" onClick={() => append({genre: ''})}>Добавить</button>
        </div>
    )
}
