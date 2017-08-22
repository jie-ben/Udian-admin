import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Switch } from 'antd'
import styles from './Layout.less'
import { config } from '../../utils'
import Menus from './Menu'

function Sider ({ siderFold, darkTheme, location, changeTheme, navOpenKeys, changeOpenKeys, menu, switchSider,onMouseOut, onMouseOver }) {
  const menusProps = {
    menu,
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeOpenKeys,
  }
  return (
    <div onMouseOver = {onMouseOver} onMouseOut = {onMouseOut}>
      <div className={styles.logo}>
        <img alt={'logo'} src={siderFold ? config.logo_x:config.logo} />
        {siderFold ? '' : <span>{config.name}</span>}
      </div>
      <Menus {...menusProps} />
      {!siderFold ? <div className={styles.switchtheme}>
        <span><Icon type="bulb" />切换主题</span>
        <Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren="白" unCheckedChildren="黑" />
      </div> : ''}
    </div>
  )
}

Sider.propTypes = {
  menu: PropTypes.array,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.object,
  changeTheme: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Sider
