/*
* @Author: baosheng
* @Date:   2018-04-02 22:24:57
* @Last Modified by:   chengbs
* @Last Modified time: 2018-05-22 15:46:54
*/
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import AppMenu from 'Components/Menus'
import history from 'Util/history'
import style from './style.css'

class MainLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      path: '',
      isMenuPage: true,
      animated: false
    }
    this.goBack = this.goBack.bind(this)
    this.showMenu = this.showMenu.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    const propObj = this.getRouteByPath(nextProps.location.pathname)
    this.setState({
      title: propObj['title'],
      isMenuPage: propObj['showMenu'],
      animated: propObj['animated'],
      path: nextProps.location.pathname
    })
  }
  componentWillMount() {
    const rtObj = this.getRouteByPath()
    this.setState({
      isMenuPage: rtObj['showMenu'],
      animated: rtObj['animated'],
      title: rtObj['title']
    })
  }
  showMenu() {
    const { routes } = this.props
    if (this.state.isMenuPage) {
      return (
        <AppMenu onTouch={this.touchMenu.bind(this)} path={this.state.path} routes={routes}>
          {
            routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  animated={route.animated}
                  path={route.path}
                  exact={route.exact}
                  parent={route.parent}
                  render={(match) => {
                    return <route.component match={match}/>
                  }}
                />
              )
            })
          }
        </AppMenu>
      )
    } else {
      return (
        <div style={{ width: '100%', height: '100%' }}>
          {
            routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  animated={route.animated}
                  path={route.path}
                  exact={route.exact}
                  render={(match) => {
                    return <route.component match={match} />
                  }}
                />
              )
            })
          }
        </div>
      )
    }
  }
  touchMenu(event) {
    this.setState({
      title: event
    })
  }
  goBack() {
    history.goBack()
  }
  getRouteByPath(pathname = history.location.pathname) {
    const { routes } = this.props
    let routeObj = null
    routes.map((route, index) => {
      if (route['path'] === pathname) {
        routeObj = route
      }
    })
    return routeObj
  }
  render() {
    let animateClass = ''
    if (!this.state.isMenuPage && this.state.animated) { // 单页 无菜单
      if (this.state.path === '/PushOrder') {
        animateClass = `animated ${style['bounceInUp']}`
      } else {
        animateClass = `animated ${style['bounceInRight']}`
      }
    }
    return (
      <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }} className={animateClass}>
        {this.showMenu()}
      </div>
    )
  }
}

export default MainLayout
