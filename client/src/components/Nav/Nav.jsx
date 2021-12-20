import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Menu } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { SubMenu, Item } = Menu;

export const Nav = () => {
  const [current, setCurrent] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleMenuActive = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={handleMenuActive}
      selectedKeys={[current]}
      mode="horizontal"
      style={{ padding: "0 120px" }}
    >
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      {isLoggedIn && (
        <SubMenu
          key="register2"
          icon={<UserOutlined />}
          title="UserInfo"
          style={{ marginLeft: "auto" }}
        >
          <Item key="setting:1">Option 1</Item>
          <Item key="setting:2">Option 2</Item>
        </SubMenu>
      )}

      {!isLoggedIn && (
        <>
          <Item
            key="login"
            icon={<LoginOutlined />}
            style={{ marginLeft: "auto" }}
          >
            <Link to="/login">Login</Link>
          </Item>

          <Item key="register" icon={<UserAddOutlined />}>
            <Link to="/register">Register</Link>
          </Item>
        </>
      )}
    </Menu>
  );
};
