# react-zhihu
仿写知乎web部分页面-PC端

> 前端小白求内推 微信fandeqing0217

##
本项目使用React16.13，JavaScript开发

## 技术点
* react
* react-router-dom
* redux(数据管理)
* redux-thunk(支持异步Action)
* react-helmet(Head管理)
* react-lazyload(图片懒加载)
* react-loadable(代码分割)
* axios(浏览器和node通用的Axios API)
* express(后端服务)

## 实现功能
* 首页<br/>
* 推荐页<br/>
  1.推荐列表<br/>
  2.评论列表<br/>
* 关注页<br/>
* 热榜页<br/>
  1.榜单拖拽<br/>
  2.排行榜<br/>
* 问题页<br/>
  1.问题描述<br/>
  2.回答列表<br/>
* 回答页<br/>
* 视频页<br/>
  1.视频播放<br/>
  2.相关推荐<br/>
  3.评论列表<br/>

## 运行
> 先运行服务端接口，见`zhihu-api`目录。本http服务默认端口: 3011

### `npm install`
安装项目依赖包

### `npm run dev`
运行开发环境

### `npm run build`
打包客户端和服务端，运行生产环境前必须先打包

### `npm run start`
运行生产环境

## 屏幕截图
<p align="center">
    <img src="https://github.com/Fandeqing/static-resource/blob/master/screenshots/01_home.png"  width="600px" alt="index" />
    <img src="https://github.com/Fandeqing/static-resource/blob/master/screenshots/02_commentPop.png"  width="600px" alt="commentPop" />
    <img src="https://github.com/Fandeqing/static-resource/blob/master/screenshots/03_comment.png"  width="600px" alt="comment" />
    <img src="https://github.com/Fandeqing/static-resource/blob/master/screenshots/04_hotList.png"  width="600px" alt="hotList" />
    <img src="https://github.com/Fandeqing/static-resource/blob/master/screenshots/05_hotBar.png"  width="600px" alt="hotBar" />
    <img src="https://github.com/Fandeqing/static-resource/blob/master/screenshots/06_video.png"  width="600px" alt="video" />
    <img src="https://github.com/Fandeqing/static-resource/blob/master/screenshots/07_videoRec.png"  width="600px" alt="videoRec" />
    <img src="https://github.com/Fandeqing/static-resource/blob/master/screenshots/08_answer.png"  width="600px" alt="answer" />
    <img src="https://github.com/Fandeqing/static-resource/blob/master/screenshots/09_answerRec.png"  width="600px" alt="answerRec" />
    <img src="https://github.com/Fandeqing/static-resource/blob/master/screenshots/10_question.png"  width="600px" alt="question" />      
</p>
