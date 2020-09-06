import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { getRecommendData } from '../../../../redux/actions/recommend'

import style from './navbar-home-v2.module.scss'

class NavBarHomeV2 extends Component {

    handleClick = e => {
        if (this.props.location.pathname === '/') {
            this.props.getRecommend()
        }
    }

    render() {
        return (
            <div className={style.navBar}>

                <NavLink exact to='/home' className={style.link} activeClassName={style.active}
                    onClick={this.handleClick}
                >
                    {'推荐'}
                </NavLink>
                <NavLink exact to='/home/follow' className={style.link} activeClassName={style.active}>
                    {'关注'}
                </NavLink>
                <NavLink exact to='/home/hot' className={style.link} activeClassName={style.active}>
                    {'热榜'}
                </NavLink>
            </div>
        )
    }
}



const mapDispatchToProps = dispatch => {
    return {
        getRecommend: () => dispatch(getRecommendData())
    }
}



export default connect(null, mapDispatchToProps)(withRouter(NavBarHomeV2));