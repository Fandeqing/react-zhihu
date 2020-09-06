import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import RecomendIcon from '../../../../components/svg/RecomendIcon'
import FollowIcon from '../../../../components/svg/FollowIcon'
import HotIcon from '../../../../components/svg/HotIcon'
import { getRecommendData } from '../../../../redux/actions/recommend'

import style from './navbar-home.module.scss'


class NavBarHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentIdx: 0,
        }
    }

    handleClick = e => {
        if (this.props.location.pathname === '/') {
            this.props.getRecommend()
        }
    }

    render() {
        return (
            <div>
                <nav className={style.navBar}>
                    <NavLink exact to='/' className={style.link} activeClassName={style.active}
                        onClick={this.handleClick}
                    >
                        <RecomendIcon />
                        {'推荐'}
                    </NavLink>
                    <NavLink exact to='/follow' className={style.link} activeClassName={style.active}>
                        <FollowIcon />
                        {'关注'}
                    </NavLink>
                    <NavLink exact to='/hot' className={style.link} activeClassName={style.active}>
                        <HotIcon />
                        {'热榜'}
                    </NavLink>
                    <div className={style.line}></div>
                    <div className={style.moreContent}>
                        <span>更多内容</span>
                        <span>敬请期待</span>
                    </div>
                </nav>
            </div>
        )
    }
}



const mapDispatchToProps = dispatch => {
    return {
        getRecommend: () => dispatch(getRecommendData())
    }
}


export default connect(null, mapDispatchToProps)(withRouter(NavBarHome));
