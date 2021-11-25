import {ChangeEvent} from "react";
import {Control, Controller, UseFormWatch} from "react-hook-form";
import styles from "./rangeSlide.module.scss"
import {FiltersForm} from "../filters";
import {range} from "../../../../utils/range";

type Props = {
    control: Control<FiltersForm, Object>
    watch: UseFormWatch<FiltersForm>
}

export const RangeSlider = ({control, watch}: Props) => {
    const [sliderOneValue, sliderTwoValue] = watch(["slider1", "slider2"])

    const max = 2023
    const min = 1990
    const percentOne = ((sliderOneValue.value - min) / (max - min)) * 100
    const percentTwo = ((sliderTwoValue.value - min) / (max - min)) * 100

    const slideOne = (e: ChangeEvent<HTMLInputElement>, onChange: any, value2: number) => {
        if (+e.target.value <= value2) {
            onChange(+e.target.value)
        }
    }
    const slideTwo = (e: ChangeEvent<HTMLInputElement>, onChange: any, value1: number) => {
        if (+e.target.value >= value1) {
            onChange(+e.target.value)
        }
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.values}>
                <span>
                    {sliderOneValue.value}
            </span>
                <span> - </span>
                <span>
                    {sliderTwoValue.value}
            </span>
            </div>
            <div className={styles.container}>
                <div className={styles.track}
                     style={{
                         background: `linear-gradient(to right, #dadae5 ${percentOne}% , 
                     #00C9FFFF ${percentOne}% , #00C9FFFF ${percentTwo}%, #dadae5 ${percentTwo}%)`
                     }}/>
                <Controller
                    control={control}
                    name="slider1.value"
                    render={({
                                 field: {onChange,  value,  ref},
                             }) => (
                        <input
                            onChange={e => slideOne(e, onChange, sliderTwoValue.value)} // send value to hook form
                            value={value}
                            ref={ref}
                            type="range"
                            min={min}
                            max={max}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="slider2.value"
                    render={({
                                 field: {onChange,  value,  ref},

                             }) => (
                        <input
                            onChange={e => slideTwo(e, onChange, sliderOneValue.value)} // send value to hook form
                            value={value}
                            ref={ref}
                            type="range"
                            min={min}
                            max={max}
                        />
                    )}
                />
                <div className={styles.metric}>
                    {range(min, max, 5).map(d => <span key={d}>{d}</span>)}
                </div>
            </div>
        </div>

    )
}
