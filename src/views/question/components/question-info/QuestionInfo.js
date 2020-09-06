import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'
import { getQuestionInfo } from '../../../../api/question'
import ArrowDown from '../../../../components/svg/ArrowDown'
import QuestionbActions from '../question-actions/QuestionActions'

import style from './question-info.module.scss'

class QuestionInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            questionMsg: {},
            fullContent: false,
        }
    }

    componentDidMount() {
        this.getQuestionMsg()
    }

    async getQuestionMsg() {
        const qId = this.props.match.params.qId;
        const questionMsg = await getQuestionInfo({ qId }).then(res => {
            return res
        })
        this.setState({ questionMsg })
    }

    handleFullContent = () => {
        this.setState({ fullContent: !this.state.fullContent })
    }

    render() {
        let questionMsg, title, content, tags = []
        const fakeTags = ['美 国', '华为手机', '华为', '汇丰银行', '美国司法'];
        questionMsg = this.state.questionMsg;

        tags = fakeTags.slice(Math.floor(Math.random() * fakeTags.length))

        title = questionMsg.title;
        content = questionMsg.content;

        //是否显示全部
        const contentShow = (content && content.length > 70 && !this.state.fullContent) ?
            <div className={style.msgWrapper}>
                <p dangerouslySetInnerHTML={{ __html: content.slice(0, 70) + '...' }} />
                <button>显示全部 <span>​​<ArrowDown /></span></button>
            </div> :
            <p dangerouslySetInnerHTML={{ __html: content }} />

        const contentActionsData = {
            goodNum: questionMsg.good_question_count,
            commentNum: questionMsg.comment_count,
            fullContent: this.state.fullContent
        }

        return (
            <div className={style.questionHeader}>
                {/* 问题描述 */}
                <div className={style.questionInfo}>
                    <div className={style.questionMain}>
                        <div className={style.tagsWraper}>
                            {tags.map((tag, idx) => {
                                return <div className={style.tag} key={idx}> <span>{tag}</span></div>
                            })}
                        </div>
                        <div><h1>{title}</h1></div>
                        <div className={`${style.info} ${this.state.fullContent ? style.fullContent : null}`}
                            onClick={this.handleFullContent}>
                            {contentShow}
                        </div>
                    </div>
                    <div className={style.questionSide}>side</div>
                </div>
                {/* 问题操作栏 */}
                <div className={style.questionFooter}>
                    <QuestionbActions contentActionsData={contentActionsData} closeFullContent={e => this.handleFullContent()} />
                </div>
            </div>
        )
    }
}

export default withRouter(QuestionInfo);