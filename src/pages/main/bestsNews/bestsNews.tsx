import styles from "./bestsNews.module.scss"
import {observer} from "mobx-react-lite";
import {NewsCardForMainPage} from "./newsCardForMainPage/newsCardForMainPage";
import {Swiper, SwiperSlide} from "swiper/react/swiper-react";
import 'swiper/swiper-bundle.css';
import homePageStore from "../../../store/homePageStore";

const isMobile = window.innerWidth < 800


export const BestsNews = observer(() => {
        if (isMobile) {
            return (
                <div className={styles.newsWrapper}>
                    <Swiper
                        slidesPerView="auto"
                        spaceBetween={20}
                        loop={true}
                        loopedSlides={2}
                        centeredSlides={true}
                    >
                        {
                            homePageStore.bestsNewsForMonth.map(item => {
                                return (
                                    <SwiperSlide key={item.id} className={styles.carouselItem}>
                                        <NewsCardForMainPage item={item} cardType="mobile"/>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            )
        }
        return (
            <div className={`${styles.newsWrapper} ${styles.desktopNewsWrapper}`}>
                {
                    homePageStore.bestsNewsForMonth.map((item, index) => {
                        return (
                            <NewsCardForMainPage key={item.id} item={item} cardType={index < 2 ? 'big' : 'normal'}/>
                        )
                    })
                }
            </div>
        );
    }
);

