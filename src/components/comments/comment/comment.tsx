import {CommentType} from "../../../types/Comments/CommentType";
import {CompactProfile} from "../../compactProfile/compactProfile";
import styles from "./comment.module.scss"
import {CgMailReply} from "react-icons/all";
import {observer} from "mobx-react-lite";
import {RespondCommentForm} from "./respondCommentForm/respondCommentForm";
import {SetState} from "../../../types/utils/utils";

type Props = {
    comment: CommentType
    isChildren: boolean
    newsId: number
    setSelectedCommentId: SetState<null | number>
    selectedCommentId: null | number
    isSendingComment: boolean
}

export const Comment = observer(({
                                     comment,
                                     isChildren,
                                     newsId,
                                     selectedCommentId,
                                     setSelectedCommentId,
                                     isSendingComment
                                 }: Props) => {
    const isShow = comment.id === selectedCommentId
    return (
        <div className={`${styles.body} ${isChildren ? styles.children : ''}`}>
            <div className={styles.info}>
                <CompactProfile user={comment.creator}/>
                <span className={styles.creation_date}>{comment.creation_date}</span>
            </div>
            <div className={styles.content}>
                <p>{comment.content}</p>
                {
                    !isShow && <div className={styles.answerButton}>
                        <CgMailReply/>
                        <button onClick={() => setSelectedCommentId(comment.id)}><span>Ответить</span></button>
                    </div>
                }
            </div>
            {isShow &&
            <RespondCommentForm setSelectedCommentId={setSelectedCommentId} selectedCommentId={selectedCommentId}
                                isSendingComment={isSendingComment}
                                itemId={newsId}
                                setIsShowForm={setSelectedCommentId}/>}
            {comment.children.map(c => <Comment
                setSelectedCommentId={setSelectedCommentId}
                selectedCommentId={selectedCommentId}
                newsId={newsId} key={c.id}
                isChildren={true} comment={c}
                isSendingComment={isSendingComment}/>)}

        </div>
    );
});

