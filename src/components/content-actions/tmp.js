import React, { Component } from 'react'

import VoteUp from '../svg/VoteUp'
import VoteDown from '../svg/VoteDown'
import CommentIcon from '../svg/CommentIcon'
import ShareIcon from '../svg/ShareIcon'
import CollectIcon from '../svg/CollectIcon'
import LikeIcon from '../svg/LikeIcon'
import DotsIcon from '../svg/DotsIcon'
import ArrowUp from '../svg/ArrowUp'

import styles from './content-actions.module.scss'

class ContentActions extends Component {

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const actionsDom = this.actionsRef;
        const actionsShowDom = this.actionsShowRef;

        const top = actionsDom.getBoundingClientRect().top;
        const show = ((top >= 0 && top <= window.innerHeight) || top < 0 || (window.innerHeight - this.titleBottom) < 500);

        if (this.showCollapseIcon && !show) {

            if (!actionsShowDom.classList.contains(styles.fixed)) {

                actionsShowDom.classList.remove(styles.hidden)
                actionsShowDom.classList.add(styles.fixed)
            }
        } else if (this.showCollapseIcon && show) {
            actionsShowDom.classList.add(styles.hidden)
            actionsShowDom.classList.remove(styles.fixed)

        } else if (!this.showCollapseIcon) {
            actionsShowDom.classList.add(styles.hidden)
            actionsShowDom.classList.remove(styles.fixed)

        }
    }

    render() {
        const { contentActionsData, closeFullContent } = this.props;
        const { titleBottom, voteNum, commentNum, showCollapseIcon } = contentActionsData;

        this.showCollapseIcon = showCollapseIcon;
        this.titleBottom = titleBottom;

        const contentActions = (
            <div className={styles.wrapper} >
                <span className={styles.btnWrapper}>
                    <button><span className={styles.vodeUp}><VoteUp /></span>
                        {`赞同 ${voteNum}`}
                    </button>
                    <button className={styles.vodeDown}><span><VoteDown /></span></button>
                </span>

                <button className={styles.btn}>
                    <span className={styles.icon}><CommentIcon /></span>
                    {`${commentNum} 条评论`}
                </button>
                <button className={styles.btn}>
                    <span className={styles.icon}><ShareIcon /></span>
                分享
            </button>
                <button className={styles.btn}>
                    <span className={styles.icon}><CollectIcon /></span>
                收藏
            </button>
                <button className={styles.btn}>
                    <span className={styles.icon}><LikeIcon /></span>
                喜欢
            </button>
                <button className={styles.btn}>
                    <span className={styles.icon}><DotsIcon /></span>
                </button>
                {showCollapseIcon ? (
                    <button className={`${styles.btn} ${styles.collapseBtn}`} onClick={e => closeFullContent()}>
                        收起
                        <span className={styles.icon}><ArrowUp /></span>
                    </button>
                ) : null}

            </div>
        )
        return (
            <div>
                <div ref={ref => this.actionsRef = ref}>{contentActions}</div>
                <div className={styles.hidden} ref={ref => this.actionsShowRef = ref}>{contentActions}</div>
            </div>


        )
    }
}


export default ContentActions;