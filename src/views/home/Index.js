import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import loadable from '@/utils/loadable.js'

import NavBarHomeV2 from './components/navbar-home-v2/NavBarHomeV2'
// import Recommend from './recommend/Recommend';
// import Follow from './follow/Follow';
// import Hot from './hot/Hot';
import GlobalSideBar from '@/components/global-sidebar/GlobalSideBar'
import style from './index.module.scss'

const Follow = loadable(() => import('./follow/Follow'))
const Hot = loadable(() => import('./hot/Hot'))
const Recommend = loadable(() => import('./recommend/Recommend'))

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
        }
    }


    render() {

        return (
            <div className={style.home}>
                {/* <NavBarHome /> */}
                <div className={style.homeContainer}>
                    <div className={style.mainContent}>
                        <NavBarHomeV2 />
                        <Switch>
                            <Route exact path='/home/follow' component={Follow} />
                            <Route exact path='/home/hot' component={Hot} />
                            <Route exact path='/home' component={Recommend} />
                        </Switch>
                    </div>

                    <div className={style.globalSidebar}>
                        <GlobalSideBar />
                    </div>
                </div>

            </div>
        )
    }
}

export default Home;