import React, { Component } from 'react'

import VoteUp from '../../components/svg/VoteUp'
import VoteDown from '../../components/svg/VoteDown'
import CommentIcon from '../../components/svg/CommentIcon'
import ShareIcon from '../../components/svg/ShareIcon'
import LikeIcon from '../../components/svg/LikeIcon'
import { ReportIcon } from '../../components/svg/ReportIcon'

import styles from './tool-bar.module.scss'

class ToolBar extends Component {

    render() {
        const { toBarData } = this.props;
        const { voteNum, commentNum } = toBarData;

        const toolBar = (
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
                    <span className={styles.icon}><LikeIcon /></span>
                    喜欢
                </button>

                <button className={styles.btn}>
                    <span className={styles.icon}><ReportIcon /></span>
                    举报
                </button>

            </div>
        )
        return (
            <div>
                {toolBar}
            </div>
        )
    }
}


export default ToolBar;