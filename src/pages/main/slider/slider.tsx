import styles from "./slider.module.scss"
import {useRef} from "react";
import {Swiper, SwiperSlide} from "swiper/react/swiper-react";
import 'swiper/swiper-bundle.css';
import {BsChevronLeft, BsChevronRight} from "react-icons/all";
import SwiperCore, {Navigation} from "swiper";

type Props<T> = {
    title: string
    items: T[]
    renderItem: (item: T) => JSX.Element
}
SwiperCore.use([Navigation]);

export const Slider = <T extends { id: number }>({renderItem, items, title}: Props<T>) => {
    const navigationPrevRef = useRef<HTMLButtonElement>(null)
    const navigationNextRef = useRef<HTMLButtonElement>(null)
    return (
        <div className={styles.slider}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.sliderNavigation}>
                    <button ref={navigationPrevRef} className={styles.navigationButton}>
                        <BsChevronLeft/>
                    </button>
                    <button ref={navigationNextRef} className={styles.navigationButton}>
                        <BsChevronRight/>
                    </button>
                </div>
            </div>
            <Swiper
                slidesPerView={1}
                spaceBetween={15}
                grabCursor={true}
                loop={true}
                touchEventsTarget="container"
                onInit={(swiper) => {
                    // @ts-ignore
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    // @ts-ignore
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                breakpoints={{
                    400: {
                        slidesPerView: 2,
                        spaceBetween: 15
                    },
                    600: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    }
                }}>
                {items.map((item) => <SwiperSlide key={item.id}>{renderItem(item)}</SwiperSlide>)}
            </Swiper>
        </div>
    );
};

