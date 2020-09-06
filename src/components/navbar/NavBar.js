import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom'

import style from './navbar.module.scss'

import Logo from '../../components/svg/Logo'
import InfoIcon from '../../components/svg/InfoIcon'
import MessageLogo from '../../components/svg/MessageLogo'


class NavBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentIdx: 0,
            needFixed: false,
            totalSearchBar: false
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {

        if (window.scrollY > 0) {
            if (!this.state.needFixed)
                this.setState({ needFixed: true })
        } else {
            if (this.state.needFixed)
                this.setState({ needFixed: false })
        }
        if (window.scrollY > 70) {
            if (!this.state.needScroll)
                this.setState({ needScroll: true })
        } else {
            if (this.state.needScroll)
                this.setState({ needScroll: false })
        }
    }

    handleSearchFocus = e => {
        if (e.target.tagName === 'INPUT' && !this.state.totalSearchBar) {
            this.setState({ totalSearchBar: true })

            const inputDom = this.inputRef;
            const inputBtnDom = this.inputBtnRef;
            const searchBtnDom = this.searchBtn;

            inputDom.classList.add(style.focusedInput)
            inputBtnDom.classList.add(style.focusedInputBtn)
            searchBtnDom.classList.add(style.focusedSearchBtn)

        }
    }
    handleSearchBlur = e => {
        this.setState({ totalSearchBar: false })
        const inputDom = this.inputRef;
        const inputBtnDom = this.inputBtnRef;
        const searchBtnDom = this.searchBtn;

        inputDom.classList.remove(style.focusedInput)
        inputBtnDom.classList.remove(style.focusedInputBtn)
        searchBtnDom.classList.remove(style.focusedSearchBtn)
    }

    render() {
        return (
            <div>
                <div className={`${style.header} ${this.state.needFixed ? style.fixed : ''} `}>
                    <div className={`${style.navBar} ${this.state.needScroll ? style.scrollUp : ''}`}>
                        <a className={style.logo} href="//www.zhihu.com" aria-label="知乎">
                            <Logo />
                        </a>
                        <ul className={style.tab}>
                            <li className={style.tabItem}>
                                <NavLink to='/home' className={style.tabLink} activeClassName={style.active}>
                                    首页
                                </NavLink>
                            </li>

                            <li className={style.tabItem} >
                                <NavLink to='/explore' className={style.tabLink} activeClassName={style.active}>
                                    发现
                                </NavLink>
                            </li>
                            <li className={style.tabItem} >
                                <NavLink to='/question/waiting' className={style.tabLink} activeClassName={style.active}>
                                    等你来答
                                </NavLink>
                            </li>
                        </ul>
                        <div className={style.searchBar}>
                            <div className={style.searchWraper} onFocus={e => this.handleSearchFocus(e)}
                                onBlur={e => this.handleSearchBlur(e)}
                                ref={ref => this.inputRef = ref}
                            >
                                <form className={style.form}>
                                    <label htmlFor="" className={style.searchForm} >
                                        <input className={style.searchinput} type="text" placeholder='仿写知乎' />
                                        <button className={style.searchIcon} ref={ref => this.inputBtnRef = ref} >
                                            {/* <SearchOutlined />  */}
                                            <svg className="Zi Zi--Search SearchBar-searchIcon" fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M17.068 15.58a8.377 8.377 0 0 0 1.774-5.159 8.421 8.421 0 1 0-8.42 8.421 8.38 8.38 0 0 0 5.158-1.774l3.879 3.88c.957.573 2.131-.464 1.488-1.49l-3.879-3.878zm-6.647 1.157a6.323 6.323 0 0 1-6.316-6.316 6.323 6.323 0 0 1 6.316-6.316 6.323 6.323 0 0 1 6.316 6.316 6.323 6.323 0 0 1-6.316 6.316z" fillRule="evenodd"></path></svg>
                                        </button>
                                    </label>
                                </form>
                            </div>
                            <button className={style.searchButton} ref={ref => this.searchBtn = ref}>提问</button>
                        </div>
                        <div className={style.userInfo}>
                            <div className={style.infoWraper}>
                                <button className={style.infoBtn}>
                                    <span><InfoIcon /></span>
                                </button>
                            </div>
                            <div className={style.messageWraper}>
                                <button className={style.messageBtn}>
                                    <span><MessageLogo /></span>
                                </button>
                            </div>
                            {/* <div className={style.headerWraper}>
                            <button> */}
                            <img className={style.headerPic} src={require('../../assets/images/header.jpg')} alt='headerImg'></img>
                            {/* </button>
                        </div> */}

                        </div>
                    </div>

                    {/* 页面滚动后显示的navbar */}
                    <div className={`${style.navBarBot} ${this.state.needScroll ? style.scrollUp : ''}`}>
                        <a className={style.logo} href="//www.zhihu.com" aria-label="知乎">
                            <Logo />
                        </a>

                        <div className={style.navBarTitle}>
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

                        <div className={style.searchBarBot} >
                            <div className={style.searchWraperBot} >
                                <form className={style.formBot}>
                                    <label htmlFor="" className={style.searchFormBot} >
                                        <input className={style.searchinputBot} type="text" placeholder='仿写知乎' />
                                        <button className={style.searchIconBot}>
                                            {/* <SearchOutlined />  */}
                                            <svg className="Zi Zi--Search SearchBar-searchIcon" fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M17.068 15.58a8.377 8.377 0 0 0 1.774-5.159 8.421 8.421 0 1 0-8.42 8.421 8.38 8.38 0 0 0 5.158-1.774l3.879 3.88c.957.573 2.131-.464 1.488-1.49l-3.879-3.878zm-6.647 1.157a6.323 6.323 0 0 1-6.316-6.316 6.323 6.323 0 0 1 6.316-6.316 6.323 6.323 0 0 1 6.316 6.316 6.323 6.323 0 0 1-6.316 6.316z" fillRule="evenodd"></path></svg>
                                        </button>
                                    </label>
                                </form>
                            </div>
                            <button className={style.searchButtonBot}>提问</button>
                        </div>

                    </div>

                </div>

                {this.state.needFixed ?
                    <div className={style.navBarStick}></div> :
                    null
                }
            </div>

        )
    }
}

export default withRouter(NavBar);