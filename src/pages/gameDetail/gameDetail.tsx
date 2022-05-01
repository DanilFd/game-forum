import styles from "./gameDetail.module.scss"
import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import gamesStore from "../../store/gamesStore";
import {useParams} from "react-router-dom";
import Loader from "../../components/loader/loader";
import {Switch} from "../../components/switch/switch";
import authStore from "../../store/authStore";
import {toast} from "react-toastify";
import {Genres} from "../games/game/genres/genres";
import {Platforms} from "../games/game/platforms/platforms";
import {useError} from "../../hooks/useError";
import {useBackColorForScore} from "../../hooks/useBackColorForScore";
import {Modal} from "../../components/modal/modal";
import {StarRatingControl} from "./startRatingControl/starRatingControl";
import {declOfNum} from "../../utils/declOfNum";
import {GameGallery} from "./gameGallery/gameGallery";
import {FormLoader} from "../../components/header/formLoader/formLoader";
import {InfoBar} from "./infoBar/infoBar";
import {NewsForGameDetail} from "./newsForGameDetail/newsForGameDetail";

export const GameDetail = observer(() => {
        const params = useParams<{ gameSlug: string }>()
        const [isActiveModal, setIsActiveModal] = useState(false)
        const [isActive, setIsActive] = useState<'news' | 'gallery' | 'blogs'>('gallery')
        useEffect(() => {
            gamesStore.getGameDetail(params.gameSlug)
        }, [params.gameSlug])
        useError(gamesStore.error)
        const color = useBackColorForScore(gamesStore.gameDetail ? gamesStore.gameDetail.rating : 0)
        const rateGame = (rating: number) => {
            gamesStore.rateGame(gamesStore.gameDetail!.id, rating)
                .then(() => {
                    gamesStore.setUserRating(rating)
                    toast.success(`Ваша оценка ${rating} принята.`)
                })
                .catch(() => toast.error('При оценке игры произошла ошибка.'))
        }
        const ratingOfOtherUsers = gamesStore.gameDetail?.rating_of_other_users
        return (
            <main className={styles.layout}>
                {
                    gamesStore.isLoadingGameDetail ?
                        <Loader/> :
                        <>
                            <section className={styles.gameOverview}>
                                <div className={styles.gameDetails}>
                                    <h1 className={styles.gameTitle}>{gamesStore.gameDetail?.title}</h1>
                                    <div className={styles.gameSpecs}>
                                        <Platforms game={gamesStore.gameDetail!} navigation={false}/>
                                        <Genres game={gamesStore.gameDetail!} navigation={false}/>
                                        <span>Дата выхода: {gamesStore.gameDetail?.release_date}</span>
                                        <span>Разработчик: {gamesStore.gameDetail?.developer}</span>
                                    </div>
                                </div>
                                <div className={styles.gameInfo}>
                                    <div className={styles.gameImg}>
                                        <img src={gamesStore.gameDetail?.img} alt={gamesStore.gameDetail?.title}/>
                                    </div>
                                    <div className={styles.gameRating}
                                         style={{backgroundColor: color}}>
                                        <span className={styles.rating}>{gamesStore.gameDetail?.rating}</span>
                                        <div className={styles.rateGame}>
                                        <span
                                            onClick={() => authStore.isAuth ? setIsActiveModal(true) :
                                                toast.info('Для этого необходимо авторизоваться.')}>оценить игру</span>
                                            <Modal active={isActiveModal} setActive={setIsActiveModal}>
                                                {
                                                    gamesStore.isLoadingRateGame ?
                                                        <FormLoader/> :
                                                        <>
                                                            <p className={styles.other_users_rating}>
                                                                <strong>{ratingOfOtherUsers!.users_count}</strong>
                                                                {declOfNum(ratingOfOtherUsers!.users_count, ['пользователь', 'пользователя', 'пользователей'])} уже {declOfNum(ratingOfOtherUsers!.users_count, ['оценил', 'оценили', 'оценили'])}
                                                                <strong>{gamesStore.gameDetail?.title}</strong> на {gamesStore.gameDetail?.rating_of_other_users.users_rating} из
                                                                10
                                                            </p>
                                                            <span className={styles.modalHeading}>Ваша оценка:</span>
                                                            <StarRatingControl changeRating={rateGame}
                                                                               userRating={gamesStore.gameDetail!.user_rating}/>
                                                        </>
                                                }
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section>
                                <InfoBar
                                    screenshotsCount={gamesStore.gameDetail ? gamesStore.gameDetail.screenshots.length : 0}
                                    newsCount={gamesStore.gameDetail!.news_count}
                                    setIsActive={setIsActive}/>
                                {isActive === 'gallery' &&
                                <GameGallery gameScreenshots={gamesStore.gameDetail!.screenshots}/>}
                                {isActive === 'news' && <NewsForGameDetail news_id={gamesStore.gameDetail!.id}/>}

                            </section>
                            <div className={styles.switch}>
                                <span>Следить за игрой:</span>
                                <Switch
                                    isChecked={gamesStore.gameDetail!.is_following}
                                    toggle={() => authStore.isAuth ? gamesStore.toggleFollowing(gamesStore.gameDetail!) :
                                        toast.info('Для этого необходимо авторизоваться.')}/>
                            </div>
                        </>
                }
            </main>
        );
    }
);
