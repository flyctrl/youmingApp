/*
* @Author: baosheng
* @Date:   2018-04-02 22:17:47
* @Last Modified by:   chengbs
* @Last Modified time: 2018-04-29 01:10:51
*/
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import history from 'Util/history'
import * as urls from 'Contants/urls'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import style from './Container.css'
import './style.css'
require('Src/assets/iconfont.js')

const data = [
  {
    path: urls.HOME,
    key: 'Home',
    icon: '#icon-home',
    onIcon: '#icon-home-on',
    title: '首页'
  }, {
    path: urls.MESSAGE,
    key: 'Message',
    icon: '#icon-xiaoxi',
    onIcon: '#icon-xiaoxi-on',
    title: '消息'
  }, {
    path: urls.WORKPLAT,
    key: 'Workplat',
    icon: '#icon-gongzuo',
    onIcon: '#icon-gongzuo-on',
    title: '工作台'
  }, {
    path: urls.CONTACT,
    key: 'Contact',
    icon: '#icon-tongxunlu',
    onIcon: '#icon-tongxunlu-on',
    title: '通讯录'
  }, {
    path: urls.MINE,
    key: 'Mine',
    icon: '#icon-wode',
    onIcon: '#icon-wode-on',
    title: '我的'
  }
]
class AppMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: (history.location.pathname).slice(1) || 'Home'
    }
  }
  componentWillMount() {
    this.setState({
      selectedTab: (history.location.pathname).split('/')[1]
    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedTab: nextProps.path !== '' ? (nextProps.path).split('/')[1] : 'Home'
    })
  }
  showComponent() {
    const { routes } = this.props
    return (
      <div>
        {
          routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(match) => {
                  return (
                    <div>
                      <route.component match={match}/>
                    </div>
                  )
                }}
              />
            )
          })
        }
      </div>
    )
  }
  getComponentByUrl(url) {
    const childAry = this.props.children
    let newAry = []
    childAry.map((value, index, ary) => {
      if (value.props.path === url) {
        newAry = value
      }
    })
    return newAry
  }
  render() {
    console.log(this.props)
    return (
      <div className='tabBody'>
        <TabBar
          unselectedTintColor='#949494'
          tintColor='#33A3F4'
          barTintColor='white'
          noRenderContent={false}
        >
          {
            data.map((item, index) => {
              return (
                <TabBar.Item
                  title={item['title']}
                  key={item['key']}
                  icon={<svg className='icon-menu' aria-hidden='true'><use xlinkHref={item['icon']}></use></svg>}
                  selectedIcon={<svg className='icon-menu' aria-hidden='true'><use xlinkHref={item['onIcon']}></use></svg>}
                  selected={this.state.selectedTab === (item['key'] || '/')}
                  onPress={() => {
                    this.setState({
                      selectedTab: item['key'],
                    })
                    this.props.onTouch(item['title'])
                    history.push(item['path'], { title: item['title'] })
                  }}
                >
                  <ReactCSSTransitionGroup
                    transitionName='transitionWrapper'
                    className={style['transitionWrapper']}
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}>
                    <div key={history.location.pathname} style={{ position: 'absolute', width: '100%' }}>
                      { history.location.pathname === item['path'] ? this.getComponentByUrl(history.location.pathname) : this.showComponent() }
                    </div>
                  </ReactCSSTransitionGroup>
                </TabBar.Item>
              )
            })
          }
        </TabBar>
      </div>
    )
  }
}

export default AppMenu
