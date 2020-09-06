import React, { Component } from 'react'

import VoteUp from '../svg/VoteUp'
import VoteDown from '../svg/VoteDown'
import CommentIcon from '../svg/CommentIcon'
import ShareIcon from '../svg/ShareIcon'
import CollectIcon from '../svg/CollectIcon'
import LikeIcon from '../svg/LikeIcon'
import DotsIcon from '../svg/DotsIcon'
import ArrowUp from '../svg/ArrowUp'
import { tranNum } from '../../utils/tranNum'
import { debounce } from '../../utils/debounce'

import styles from './content-actions.module.scss'

class ContentActions extends Component {

    constructor(props) {
        super(props);
        this.closeFullContent = props.closeFullContent;
        this.showComment = props.handleComment;
        this.children = this.props.children || null;
        this.state = {
            showComment: false,
            voteUp: false,
            voteDown: false,
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
        this.initComment();
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    initComment = () => {
        const commentBtnDom = this.commentBtn;
        commentBtnDom.addEventListener('click', e => {
            e.stopPropagation();
            this.showComment();
        })
    }

    handleScroll = () => {
        this.actionsDom = this.actionsRef;
        this.positionDom = this.positionRef;

        const top = this.positionDom.getBoundingClientRect().top;
        const showFixed = ((top >= window.innerHeight - 30) && (window.innerHeight - this.titleBottom > 100));

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
        if (this.actionsDom.classList.contains(styles.fix)) {
            this.actionsDom.classList.remove(styles.fix)
        }
    }

    handleVoteUp = () => {
        if (this.state.voteDown) {
            this.setState({
                voteDown: false
            })
        }
        this.setState({
            voteUp: !this.state.voteUp
        })
    }
    handleVoteDown = () => {
        if (this.state.voteUp)
            this.setState({
                voteUp: false
            })
        this.setState({
            voteDown: !this.state.voteDown
        })
    }
    render() {
        const { contentActionsData } = this.props;
        const { itemId, titleBottom, voteNum, commentNum, showCollapseIcon, showComment } = contentActionsData;
        this.fullContent = showCollapseIcon;
        this.titleBottom = titleBottom;
        //回答，视频，文章的id，用来请求相应评论
        this.itemId = itemId;

        const contentActions = (
            <div className={styles.wrapper} >
                <span className={styles.btnWrapper}>
                    <button onClick={debounce(this.handleVoteUp, 200)} className={this.state.voteUp ? styles.btnVoteUp : ""}>
                        <span className={styles.vodeUp}><VoteUp /></span>
                        {this.state.voteUp ? `赞同 ${tranNum(voteNum + 1)}` : `赞同 ${tranNum(voteNum)}`}
                    </button>
                    <button onClick={debounce(this.handleVoteDown, 200)} className={`${styles.vodeDown} ${this.state.voteDown ? styles.btnVoteDown : ""}`}><span><VoteDown /></span></button>
                </span>
                <button className={styles.btn} ref={ref => this.commentBtn = ref}>
                    {
                        !showComment ? (
                            <div className={styles.commentWraper}>
                                <span className={styles.icon}><CommentIcon /></span>
                                {`${commentNum} 条评论`}
                            </div>
                        ) : (
                                <div className={styles.commentWraper}>
                                    <span className={styles.icon}><CommentIcon /></span>
                                    {`收起评论`}
                                </div>
                            )
                    }

                </button>
                <button className={`${styles.btn} ${styles.btnShare}`}>
                    <span className={styles.icon}><ShareIcon /></span>
                    分享
                </button>
                <button className={`${styles.btn} ${styles.btnCollect}`}>
                    <span className={styles.icon}><CollectIcon /></span>
                    收藏
                </button>
                <button className={`${styles.btn} ${styles.btnLike}`}>
                    <span className={styles.icon}><LikeIcon /></span>
                     喜欢
                </button>
                <button className={`${styles.btn} ${styles.btnDots}`}>
                    <span className={styles.icon}><DotsIcon /></span>
                </button>
                {this.fullContent ? (
                    <button className={`${styles.btn} ${styles.collapseBtn}`} onClick={this.handleClose}>
                        收起
                        <span className={styles.icon}><ArrowUp /></span>
                    </button>
                ) : null}
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


export default ContentActions;