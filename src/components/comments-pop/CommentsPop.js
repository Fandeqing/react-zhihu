import React, { Component } from 'react'

import CommentItem from "../comment-item/CommentItem"
import { CloseIcon } from "../../components/svg/CloseIcon"

import style from './comments-pop.module.scss'

export default class CommentsPop extends Component {
    render() {

        const timer = setTimeout(() => {
            this.pop.classList.add(`${style.showPop}`)
            clearTimeout(timer)
        }, 10);

        const { rootComment, childComments, handleClose } = this.props;
        return (

            <div className={style.modalWrap} ref={ref => this.pop = ref}>
                <div className={style.modalBack}></div>
                <div className={style.modalContent}>
                    <div className={style.modalInner}>
                        {/* title */}
                        <div className={style.topBar}>
                            <div className={style.titleWrap}>
                                <h2 className={style.title}>查看对话</h2>
                            </div>
                        </div>
                        {/* 评论 */}
                        <div>
                            {/* rootComment */}
                            <div>
                                <CommentItem item={rootComment} />
                            </div>
                            <div className={style.divider}></div>
                            {/* childComments */}
                            {childComments.map((comment, idx) => {
                                return <div key={idx}>  <CommentItem item={comment} /> </div>
                            })}
                        </div>
                    </div>
                    <button className={style.btnClose} onClick={e => handleClose()}><CloseIcon /></button>
                </div>
            </div>
        )
    }
}
