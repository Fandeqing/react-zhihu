import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import loadable from '@/utils/loadable.js'
// import Questions from './question/Questions';
// import Answer from './answer/Answer';
// import GlobalSideBar from '../../components/global-sidebar/GlobalSideBar'
import style from './index.module.scss'

const Questions = loadable(() => import('./question/Questions'))
const Answer = loadable(() => import('./answer/Answer'))

class Question extends Component {

    render() {

        return (
            <div className={style.home}>
                <div className={style.homeContainer}>
                    <Switch>
                        <Route path='/question/:qId/answer/:aId' component={Answer} />
                        <Route path='/question/:qId' component={Questions} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default Question;