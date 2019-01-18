
import React, { PureComponent } from 'react';
import { Tabs, Tab } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Router from 'umi/router';
import PropTypes from 'prop-types';
import BizIcon from '../BizIcon';
import theme from '@/theme';

// class MenuBar extends PureComponent {
//   render() {
//     const { isMenubar, children, pathname } = this.props;
//     return (
//       <TabBar hidden={isMenubar} tintColor={theme.primaryColor}>
//         {tabBarData.map(({
//           title, icon, selectedIcon, link,
//         }) => (
//             <TabBar.Item
//               key={link}
//               title={title}
//               icon={<BizIcon type={icon} />}
//               selectedIcon={<BizIcon type={selectedIcon} />}
//               selected={pathname === link}
//               onPress={() => Router.push(`${link}`)}
//             >
//               {/* 匹配到的children路由进行渲染 */}
//               {children.props.location.pathname === link && children}
//             </TabBar.Item>
//           ))}
//       </TabBar>
//     );
//   }
// }

class MenuBar extends PureComponent {
  state = {
    value: '/'
  }
  handleChange=(event,value)=>{
    console.log('aaaaaaaaaaaaaa',value)
    this.setState({ value })
    Router.push(value)
  }
  render() {
    const { children, pathname } = this.props;
    return (
      <MuiThemeProvider>
        <div>
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
        variant="fullWidth"
        indicatorcolor={theme.mainPurple}
        textcolor={theme.mainPurple}>
            <Tab
              icon={<BizIcon type='home' />}
              label='考勤'
              value='/'
            />
            <Tab
              icon={<BizIcon type='table' />}
              label='课表'
              value='/category'
            />
            <Tab
              icon={<BizIcon type='user' />}
              label='我的'
              value='/info'
            />
              {/* 匹配到的children路由进行渲染 */}
        </Tabs>
        {/* {children.props.location.pathname == this.state.value } */}
        {pathname}
        </div>
      </MuiThemeProvider>
      )}
    }


MenuBar.defaultProps = {
  children: null,
  pathname: '/',
};

MenuBar.propTypes = {
  children: PropTypes.node,
  pathname: PropTypes.string,
};

export default MenuBar;
