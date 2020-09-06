import React, { Component } from 'react'

import { SmileIcon } from "../../components/svg/SmileIcon"

import style from './comment-edit.module.scss'

class CommentEdit extends Component {

    handleinputClick = e => {
        e.preventDefault();
        const inputDom = this.input;
        const wrapDom = this.wrap;
        const btnDom = this.button;

        inputDom.focus();

        inputDom.addEventListener('focus', () => {
            btnDom.classList.add(`${style.show}`)
            wrapDom.classList.add(`${style.wrapShow}`)
        })

        inputDom.addEventListener('blur', () => {
            console.log('test')
            wrapDom.classList.remove(`${style.wrapShow}`)
            btnDom.classList.remove(`${style.show}`)
        })

    }


    render() {
        return (
            <div className={style.commentEdit}>
                <div className={style.commentEditWrap} ref={ref => this.wrap = ref} onClick={e => this.handleinputClick(e)}>
                    <div className={style.commentEditInner}>
                        {/* <textarea type="text" placeholder={"写下你的评论..."} ref={ref => this.input = ref} onKeyUp={e => this.handleKeyUp(e)} /> */}
                        <div className={style.textareaWrap}>
                            <div className={style.textarea} role="textbox" ref={ref => this.input = ref} contentEditable="true" spellCheck="true"></div>
                        </div>
                    </div>
                    <div className={style.icon}>
                        <button className={style.iconBtn}><span><SmileIcon /></span></button>
                    </div>
                </div>
                <button className={style.btn} ref={ref => this.button = ref}>发布</button>
            </div>
        )
    }
}

export default CommentEdit;