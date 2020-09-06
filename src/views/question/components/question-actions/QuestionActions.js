import React, { Component } from 'react'

import PenIcon from '../../../../components/svg/Pen'
import CommentIcon from '../../../../components/svg/CommentIcon'
import ShareIcon from '../../../../components/svg/ShareIcon'
import InviteIcon from '../../../../components/svg/Invite'
import ThumbUpIcon from '../../../../components/svg/ThumbUp'
import DotsIcon from '../../../../components/svg/DotsIcon'
import ArrowUp from '../../../../components/svg/ArrowUp'

import styles from './question-actions.module.scss'

class QuestionActions extends Component {


    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        this.actionsDom = this.actionsRef;
        this.positionDom = this.positionRef;

        const top = this.positionDom.getBoundingClientRect().top;

        const showFixed = (top >= window.innerHeight - 30);
        //显示固定的问题操作条
        if (this.fullContent && showFixed) {
            if (!this.actionsDom.classList.contains(styles.fix)) {
                this.actionsDom.classList.add(styles.fix)
            }
        } else if (!this.fullContent) {
            if (this.actionsDom.classList.contains(styles.fix)) {
                this.actionsDom.classList.remove(styles.fix)
            }
        } else if (this.fullContent && !showFixed) {
            if (this.actionsDom.classList.contains(styles.fix)) {
                this.actionsDom.classList.remove(styles.fix)
            }
        }
    }
    handleClose = () => {
        this.closeFullContent()
        if (this.fullContent && this.actionsDom.classList.contains(styles.fix)) {
            this.actionsDom.classList.remove(styles.fix)
        }
    }

    render() {
        const { contentActionsData, closeFullContent } = this.props;
        const { goodNum, commentNum, fullContent } = contentActionsData;

        this.fullContent = fullContent;
        this.closeFullContent = closeFullContent;

        const contentActions = (
            <div className={styles.wrapper} >

                <div className={styles.wrapperInner}>
                    <div className={styles.main}>

                        <button className={styles.btnFollow}>
                            关注问题
                        </button>
                        <button className={styles.btnAnswer}>
                            <span className={styles.icon}><PenIcon /></span>
                            写回答
                        </button>
                        <button className={styles.btnInvite}>
                            <span className={styles.icon}><InviteIcon /></span>
                            邀请回答
                        </button>

                        <button className={styles.btnGood}>
                            <span className={styles.vodeUp}><ThumbUpIcon /></span>
                            {`好问题 ${goodNum}`}
                        </button>
                        <button className={styles.btnComment}>
                            <span className={styles.icon}><CommentIcon /></span>
                            {`${commentNum} 条评论`}
                        </button>
                        <button className={styles.btnShare}>
                            <span className={styles.icon}><ShareIcon /></span>
                            分享
                        </button>
                        <button className={styles.btnDot}>
                            <span className={styles.icon}><DotsIcon /></span>
                        </button>
                        {fullContent ? (
                            <button className={`${styles.btnUp} ${styles.collapseBtn}`} onClick={e => this.handleClose()}>
                                收起
                                <span className={styles.icon}><ArrowUp /></span>
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        )
        return (
            <div>
                <div ref={ref => this.actionsRef = ref}>{contentActions}</div>
                <div ref={ref => this.positionRef = ref}></div>
            </div>
        )
    }
}


export default QuestionActions;