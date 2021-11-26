import {ChangeEvent} from "react";
import {Control, Controller, UseFormWatch} from "react-hook-form";
import styles from "./rangeSlide.module.scss"
import {FiltersForm} from "../filters";

type Props = {
    control: Control<FiltersForm, Object>
    watch: UseFormWatch<FiltersForm>
    dateValue: {
        min: number,
        max: number
    }
}

export const RangeSlider = ({control, watch, dateValue}: Props) => {
    const [sliderOneValue, sliderTwoValue] = watch(["slider1", "slider2"])

    const percentOne = ((sliderOneValue.value - dateValue.min) / (dateValue.max - dateValue.min)) * 100
    const percentTwo = ((sliderTwoValue.value - dateValue.min) / (dateValue.max - dateValue.min)) * 100

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
            </div>
            <div className={styles.container}>
                <div className={styles.track}
                     style={{
                         background: `linear-gradient(to right, #dadae5 ${percentOne}% , 
                     #00C9FFFF ${percentOne}% , #00C9FFFF ${percentTwo}%, #dadae5 ${percentTwo}%)`,
                         pointerEvents: "auto"
                     }}/>
                <Controller
                    control={control}
                    name="slider1.value"
                    render={({
                                 field: {onChange, value, ref},
                             }) => (
                        <input
                            onChange={e => slideOne(e, onChange, sliderTwoValue.value)} // send value to hook form
                            value={value}
                            ref={ref}
                            type="range"
                            min={dateValue.min}
                            max={dateValue.max}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="slider2.value"
                    render={({
                                 field: {onChange, value, ref},
                             }) => (
                        <input
                            onChange={e => slideTwo(e, onChange, sliderOneValue.value)} // send value to hook form
                            value={value}
                            ref={ref}
                            type="range"
                            min={dateValue.min}
                            max={dateValue.max}
                        />
                    )}
                />
                <span style={{left: '0%'}} className={styles.displayMinValue}>{dateValue.min}</span>
                <span style={{left: '100%'}} className={styles.displayMaxValue}>{dateValue.max}</span>
                <span style={{left: `${percentOne}%`}} className={styles.displayValueOne}>{sliderOneValue.value}</span>
                <span style={{left: `${percentTwo}%`}} className={styles.displayValueTwo}>{sliderTwoValue.value}</span>

            </div>
        </div>

    )
}
