import styles from "./widget.module.scss"
import {Slider} from "../slider/slider";
import {CardFowWidget} from "../cards/cardForWidget/cardFowWidget";

import 'swiper/swiper-bundle.css';

type Props = {
    title: string
    items: any[]
}

export const Widget = ({items, title}: Props) => {
    return (
        <div className={styles.widget}>
            <Slider title={title} renderItem={(item) => <CardFowWidget item={item}/>}
                    items={items}/>
        </div>
    );
};

