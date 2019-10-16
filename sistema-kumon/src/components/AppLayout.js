import React, { Component } from 'react';
import {
  Layout, Menu, Icon
} from 'antd';
import { Link } from 'react-router-dom'
import { EMAIL, TOKEN, AUTHENTICATED } from "../constants/sessionstorage";

const { Header, Content, Footer, Sider } = Layout;

export default class AppLayout extends Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
    }
  }

  logout = () => {
    sessionStorage.removeItem(AUTHENTICATED);
    sessionStorage.removeItem(TOKEN);
    window.location.href = "/login";
  }

  Basic = () => {
    return (
      <Layout className={'layout'}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => { console.log(broken); }}
          className={'ant-menu-tec'}
          onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
          style={{ minHeight: '100vh' }}
          theme="light"
        >

          <div className="logo"><img alt="Logo" style={{ width: '70%' }} className={'logo'} src={'https://www.freelogovectors.net/svg04/kumon-logo.svg'} /></div>

          <Menu theme="light" className={'ant-menu-tec'} mode="inline" defaultSelectedKeys={[this.props.view || 0]}>
            <Menu.Item key="1">
              <Link to={"/students"}><Icon type="team" />
                <span className="nav-text">Alumnos</span></Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={"/student/mark_attendance"}><Icon type="solution" />
                <span className="nav-text">Asistencia</span></Link>
            </Menu.Item>
            <Menu.Item key="3" onClick={(e) => { this.logout(); }}>
              <Icon type="logout" />
              <span>Salir</span>
            </Menu.Item>
          </Menu>

        </Sider>

        <Layout>
          <Header style={{ 'backgroundColor': '#ffff' }} className={'primaryBackground header-bar'}>
            <span className={'logoName'}>Sistema de Administración de Alumnos Kumon</span>
            <span className={'logoName'} style={{ float: 'right' }} ><Icon type={'user'} /> {sessionStorage.getItem(EMAIL)}</span>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Content style={{ padding: '0', height: '100%' }}>
                {this.props.children}
              </Content>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Sistema de administración de alumnos Kumon ©2019
          </Footer>
        </Layout>
      </Layout>
    )
  };

  render() {
    return this.Basic();
  }
}
