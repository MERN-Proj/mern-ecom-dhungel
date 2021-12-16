import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
} from "mdbreact";

const menus = {
  home: { name: "Home", path: "/" },
  login: { name: "Login", path: "/login" },
  register: { name: "Register", path: "/register" },
  cart: { name: "Cart", path: "/cart" },
};

const CustomNavLink = ({ menu, path, current, setCurrent }) => {
  return (
    <MDBNavItem className={menu === current ? "active" : ""}>
      <MDBNavLink to={path} onClick={() => setCurrent(menu)}>
        {menu}
      </MDBNavLink>
    </MDBNavItem>
  );
};

export const Nav = () => {
  const [current, setCurrent] = useState(menus.home);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { home, cart, login, register } = menus;

  function toggleCollapse() {
    setIsOpen(!isOpen);
  }

  return (
    <MDBNavbar
      className="navbar-padding"
      color="purple-gradient"
      dark
      expand="md"
    >
      <MDBNavbarBrand>
        <strong className="white-text">Navbar</strong>
      </MDBNavbarBrand>

      <MDBNavbarToggler onClick={toggleCollapse} />

      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav left>
          <CustomNavLink
            current={current}
            setCurrent={setCurrent}
            path={home.path}
            menu={home.name}
          />
          <CustomNavLink
            current={current}
            setCurrent={setCurrent}
            path={cart.path}
            menu={cart.name}
          />
        </MDBNavbarNav>

        <MDBNavbarNav right>
          <CustomNavLink
            current={current}
            setCurrent={setCurrent}
            path={register.path}
            menu={register.name}
          />
          <CustomNavLink
            current={current}
            setCurrent={setCurrent}
            path={login.path}
            menu={login.name}
          />
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
};
