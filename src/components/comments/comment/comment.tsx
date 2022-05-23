import {CommentType} from "../../../types/Comments/CommentType";
import {CompactProfile} from "../../compactProfile/compactProfile";
import styles from "./comment.module.scss"
import {CgMailReply} from "react-icons/all";
import {observer} from "mobx-react-lite";
import {RespondCommentForm} from "./respondCommentForm/respondCommentForm";
import {SetState} from "../../../types/utils/utils";
import commentsStore from "../../../store/commentsStore";
import {toast} from "react-toastify";
import {findComment} from "../../../utils/findComment";
import {useState} from "react";
import {Modal} from "../../modal/modal";
import {ReportForm} from "./reportForm/reportForm";
import authStore from "../../../store/authStore";
import {CommentRating} from "./commentRating/commentRating";

type Props = {
    comment: CommentType
    isChildren: boolean
    newsId: number
    setSelectedCommentId: SetState<null | number>
    selectedCommentId: null | number
    isSendingComment: boolean
    isNews: boolean
}

export const Comment = observer(({
                                     comment,
                                     isChildren,
                                     newsId,
                                     selectedCommentId,
                                     setSelectedCommentId,
                                     isSendingComment,
                                     isNews
                                 }: Props) => {
        const isShow = comment.id === selectedCommentId
        const [isShowModal, setIsShowModal] = useState(false)
        const deleteComment = () => {
            commentsStore.deleteComment(comment.id, isNews)
                .then(() => toast.success('Ваш комментарий удален.'))
                .catch(() => toast.error('При удалении произошла ошибка.'))
        }
        return (
            <div className={`${styles.body} ${isChildren ? styles.children : ''}`}>
                {
                    comment.is_deleted ?
                        <div className={styles.isCommentDeleted}>
                            <span>Комментарий удален</span>
                        </div> :
                        <>
                            <div className={styles.info}>
                                <CompactProfile user={comment.creator}/>
                                <div className={styles.infoGroup}>
                                    <span className={styles.creation_date}>{comment.creation_date}</span>
                                    {!comment.is_owner &&
                                    <span
                                        onClick={() => authStore.isAuth ? setIsShowModal(true) : authStore.setIsActiveAuthForm(true)}
                                        className={styles.complain}>Пожаловаться</span>}
                                    <Modal active={isShowModal} setActive={setIsShowModal}>
                                        <ReportForm commentId={comment.id} setIsShow={setIsShowModal} isNews={isNews}/>
                                    </Modal>
                                    {comment.is_owner &&
                                    <span onClick={deleteComment} className={styles.delete}>Удалить</span>}
                                </div>
                            </div>
                            <div className={styles.content}>
                                <div className={styles.parentInfo}>
                                    {comment.parent &&
                                    <span>в ответ на комментарий {findComment(commentsStore.paginatedComments!.results, comment.parent)?.creator.login}</span>
                                    }
                                </div>
                                <p>{comment.content}</p>
                                {
                                    !isShow && <div className={styles.answerButton}>
                                        <CgMailReply/>
                                        <button onClick={() => setSelectedCommentId(comment.id)}><span>Ответить</span>
                                        </button>
                                    </div>
                                }
                            </div>
                        </>
                }
                {
                    !comment.is_deleted &&
                    <div className={styles.commentRating}>
                        <CommentRating score={comment.rating} initialRate={comment.rate} commentId={comment.id}
                                       isNews={isNews}/>
                    </div>
                }
                {isShow &&
                <RespondCommentForm setSelectedCommentId={setSelectedCommentId} selectedCommentId={selectedCommentId}
                                    isSendingComment={isSendingComment}
                                    itemId={newsId}
                                    setIsShowForm={setSelectedCommentId}
                                    isNews={isNews}/>}
                {comment.children.map(c => <Comment
                    setSelectedCommentId={setSelectedCommentId}
                    selectedCommentId={selectedCommentId}
                    newsId={newsId} key={c.id}
                    isChildren={true} comment={c}
                    isSendingComment={isSendingComment}
                    isNews={isNews}
                />)}
            </div>
        );
    }
);

