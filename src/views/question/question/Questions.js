import React, { Component } from 'react'

import QuestionInfo from '../components/question-info/QuestionInfo';
import { getQuestionAnswers } from '../../../api/question'
import { createAnswerByQuestion } from '../../../models/index'
import AnswerItem from '../components/answer-item/AnswerItem'
import QuestionSideBar from './QuestionSideBar'
import RankIcon from '../../../components/svg/RankIcon'
import throttle from '../../../utils/throttle'
import Loading from '../../../components/loading/Loading'

import style from './questions.module.scss'

class Question extends Component {

    constructor(props) {
        super(props);

        this.state = {
            answersList: [],
            offset: 0,
            getMoreData: true,
        }
    }

    componentDidMount() {
        this.loadAnswers()
        window.addEventListener('scroll', this.handleScroll)
    }


    loadAnswers = async () => {
        this.qId = this.props.match.params.qId;
        const answersData = await getQuestionAnswers({ limit: 5, qId: this.qId, offset: this.state.offset })
        const answersList = answersData.data.map(answer => {
            return new createAnswerByQuestion(answer)
        })

        this.setState({
            answersList: [...this.state.answersList, ...answersList],
            offset: this.state.offset += 5
        })
    }
    //下滑加载更多
    handleScroll = () => {
        let scrollTop = document.documentElement.scrollTop;
        let windowHeight = document.body.clientHeight;
        let scrollHeight = document.body.scrollHeight;

        if (scrollTop + windowHeight >= scrollHeight - 100) {
            this.addMore()
        }
    }


    addMore = throttle(async () => {
        this.setState({
            getMoreData: false
        })
        //加载更多回答数据
        const answersData = await getQuestionAnswers({ limit: 5, qId: this.qId, offset: this.state.offset })
        this.setState({
            getMoreData: true
        })
        const answersList = answersData.data.map(answer => {
            return new createAnswerByQuestion(answer)
        })
        this.setState({
            answersList: [...this.state.answersList, ...answersList],
        })
    }, 2000)


    render() {

        let addLoad = loading => {
            if (loading) {
                return <div className={style.loading}>
                    <Loading type={'bars'} color={'lightgrey'} />
                </div >
            }
        }

        return (
            <div>
                <QuestionInfo />
                <div className={style.questionMain}>
                    <div className={style.questionMainCol}>
                        {/* 答案列表头部 */}
                        <div className={style.listHeader}>
                            <h4>517个回答</h4>
                            <div className={style.headerOption}>
                                <button>默认排序<RankIcon /></button>
                            </div>
                        </div>
                        {/* 答案列表 */}
                        <div className={style.listBody}>
                            {this.state.answersList.map((answer, idx) => {
                                return <AnswerItem item={answer} key={idx} />
                            })}
                            {/* loading */}
                            {addLoad(!this.state.getMoreData)}
                        </div>
                    </div>
                    <div className={style.questionSide}>
                        <QuestionSideBar />
                    </div>
                </div>
            </div>
        )
    }
}


export default Question;