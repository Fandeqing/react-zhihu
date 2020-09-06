import React, { Component } from 'react'

import QuestionInfo from '../components/question-info/QuestionInfo';
import { getQuestionAnswers, getSingleAnswer } from '../../../api/question'
import { createAnswerByQuestion } from '../../../models/index'
import AnswerItem from '../components/answer-item/AnswerItem'
import AnswerSideBar from './AnswerSideBar'

import style from './answer.module.scss'

class Answer extends Component {

    constructor(props) {
        super(props);
        this.qId = props.match.params.qId;

        this.state = {
            answers: [],
            offset: 0,
            singleAnswer: null
        }
    }

    componentDidMount() {
        this.loadAnswers()

    }

    loadAnswers = async () => {
        const { qId, aId } = this.props.match.params;
        //单个回答
        const singleAnswer = await getSingleAnswer({ aId })
        //更多回答
        const answersData = await getQuestionAnswers({ qId, offset: this.state.offset, limit: 2 })
        const answersList = answersData.data.map(answer => {
            return new createAnswerByQuestion(answer)
        })

        this.setState({
            answers: answersList,
            singleAnswer: new createAnswerByQuestion(singleAnswer)
        })

    }


    render() {
        return (
            <div>
                <QuestionInfo />
                <div className={style.questionMain}>
                    <div className={style.questionMainCol}>
                        {/* 答案列表头部 */}
                        <div className={style.listHeader}>
                            <a href={`/question/${this.qId}`} target="_blank" rel="noopener noreferrer">查看全部回答</a>
                        </div>
                        {/* 单个回答 */}
                        <div className={style.singleAnswer}>
                            {this.state.singleAnswer ? <AnswerItem fullContent={true} item={this.state.singleAnswer} /> : null}
                        </div>
                        {/* 答案列表 */}
                        <div className={style.listBody}>
                            <div className={style.listTop}><h4>更多回答</h4></div>
                            {this.state.answers.map((answer, idx) => {
                                return <AnswerItem fullContent={false} item={answer} key={idx} />
                            })}
                        </div>
                        {/* 答案列表尾部 */}
                        <div className={style.listHeader}>
                            <a href={`/question/${this.qId}`} target="_blank" rel="noopener noreferrer">查看全部回答</a>
                        </div>
                    </div>
                    <div className={style.questionSide}>
                        <AnswerSideBar />
                    </div>
                </div>

            </div>
        )
    }
}


export default Answer;