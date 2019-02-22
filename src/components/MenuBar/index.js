import React, { Component } from "react"
import Router from "umi/router"
import { TabBar } from "antd-mobile"
import PropTypes from "prop-types"
import BizIcon from "../BizIcon"
import theme from "@/theme"

const tabBarData = [
  {
    title: "考勤",
    icon: "home",
    selectedIcon: "home",
    link: "/"
  },
  {
    title: "课表",
    icon: "paike",
    selectedIcon: "paike",
    link: "/course"
  },
  {
    title: "我的",
    icon: "wode",
    selectedIcon: "wode",
    link: "/info"
  }
]

class MenuBar extends Component {
  render() {
    const { isMenubar, children, pathname } = this.props
    return (
      <TabBar hidden={isMenubar} tintColor={theme.primaryColor}>
        {tabBarData.map(({ title, icon, selectedIcon, link }) => (
          <TabBar.Item
            key={link}
            title={title}
            icon={<BizIcon type={icon} />}
            selectedIcon={<BizIcon type={selectedIcon} />}
            selected={pathname === link}
            onPress={() => Router.push(`${link}`)}>
            {/* 匹配到的children路由进行渲染 */}
            {children.props.location.pathname === link && children}
          </TabBar.Item>
        ))}
      </TabBar>
    )
  }
}

MenuBar.defaultProps = {
  isMenubar: false,
  children: null,
  pathname: "/"
}

MenuBar.propTypes = {
  isMenubar: PropTypes.bool,
  children: PropTypes.node,
  pathname: PropTypes.string
}

export default MenuBar
