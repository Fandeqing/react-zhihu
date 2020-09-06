import React, { Component } from 'react'

import ArrowDown from '../svg/ArrowDown'

import style from './answer-description.module.scss'

class AnswerDescription extends Component {

    render() {
        const { answerData, showFullContent } = this.props;
        const { excerptSubstr, thumbnail } = answerData;

        return (
            <div className={style.contentContainer}>
                <div className={style.contentContainer}>
                    {/* 缩略图 */}
                    {thumbnail ? (
                        <div className={style.imgCover}>
                            <div className={style.imgCoverInner}>
                                <img src={thumbnail} alt="thumbnail" />
                            </div>
                        </div>
                    ) : null}
                    {/* 部分答案 */}
                    <div className={style.contentWrapper} onClick={e => showFullContent()}>
                        <span className={style.content} dangerouslySetInnerHTML={{ __html: excerptSubstr }} />
                        <button className={style.btn}>阅读全文 <span>​​​​<ArrowDown /></span></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AnswerDescription;