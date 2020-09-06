import React, { Component } from 'react'

import style from './answer-detail.module.scss'

class AnswerDetail extends Component {
    render() {
        const { voteupCount, content, updatedTime, type } = this.props.answerDataDetail;
        const regx = /data-default-watermark-/g;
        const contentRes = content.replace(/src/g, "").replace(regx, "src")

        return (
            <div className={style.fullContentWrapper}>
                <div>
                    {type === 'answer' ? <div className={style.voteCount}>{voteupCount}人赞同了该回答</div> : null}
                    <div className={style.fullContent} dangerouslySetInnerHTML={{ __html: contentRes }}></div>
                    {type === 'answer' ? <span className={style.updateTime}> {`编辑于 ${updatedTime}`}</span> : null}
                </div>
            </div >
        )
    }
}

export default AnswerDetail;