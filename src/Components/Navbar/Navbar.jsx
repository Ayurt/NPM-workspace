import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined } from '@ant-design/icons';

const { Header } = Layout;

const Navbar = () => {
  return (
    <Layout>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="0" icon={<HeartOutlined />}></Menu.Item>
          <Menu.Item key="1" >
            <Link to="">Favorites</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/">Pro</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/about">Teams</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/contact">Pricing</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/contact">Documentation</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;
