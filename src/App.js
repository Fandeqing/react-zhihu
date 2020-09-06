import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import loadable from '@/utils/loadable.js'
import style from './App.module.scss'

const Home = loadable(() => import('@/views/home/Index'))
const Explore = loadable(() => import('@/views/explore/Explore'))
const Question = loadable(() => import('@/views/question/Index'))
const Zvideo = loadable(() => import('@/views/zvideo/Zvideo'))
const NavBar = loadable(() => import('@/components/navbar/NavBar'))

function App() {

  return (
    <div className={style.app}>
      <Helmet>
        <title>知乎</title>
      </Helmet>
      <NavBar />
      <Switch>
        <Route path='/explore' component={Explore} />
        <Route path='/question' component={Question} />
        <Route path='/zvideo/:id' component={Zvideo} />
        <Route path='/home' component={Home} />
        <Redirect from="/" to="/home" />
      </Switch>
    </div>
  )
}

export default App;
