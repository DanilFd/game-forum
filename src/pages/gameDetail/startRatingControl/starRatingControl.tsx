import styles from "./starRatingControl.module.scss"
import {FaStar} from "react-icons/all";
import {useState} from "react";

type Props = {
    userRating: number
    changeRating: (rating: number) => void
}

export const StarRatingControl = ({userRating, changeRating}: Props) => {
    const [hover, setHover] = useState<number | null>(null)
    return (
        <div className={styles.starWidget}>
            {[...Array(10)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label key={i} onMouseEnter={() => setHover(ratingValue)}
                           onMouseLeave={() => setHover(null)}>
                        <input type="radio" name="rating" value={ratingValue} onClick={() => {
                            changeRating(ratingValue)
                        }}
                        />
                        <FaStar className={styles.star}
                                color={ratingValue <= (hover || userRating) ? "#00C9FF" : "#c4c4c4"}
                        />
                        <span className={styles.number}>{ratingValue}</span>
                    </label>
                )
            })}
        </div>
    );
};

