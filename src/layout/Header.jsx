import React from "react";
import { Layout, Menu, Typography } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Header, Content } = Layout;
const { Title } = Typography;

const HeaderCompoent = () => {
  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/words">words Test</Link>
            </Menu.Item>
          </Menu>
        </Header>
      <Outlet />
    </Layout>
  );
};

export default HeaderCompoent;
