import styles from "./widget.module.scss"
import {Slider} from "../slider/slider";
import {CardFowWidget} from "../cards/cardForWidget/cardFowWidget";

import 'swiper/swiper-bundle.css';

type Props = {
    title: string
    items: any[]
    isNews:boolean
}

export const Widget = ({items, title,isNews}: Props) => {
    return (
        <div className={styles.widget}>
            <Slider title={title} renderItem={(item) => <CardFowWidget isNews={isNews} item={item}/>}
                    items={items}/>
        </div>
    );
};

