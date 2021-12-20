import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
  MDBIcon,
} from 'mdbreact';
import { useHistory } from 'react-router-dom';

const menus = {
  home: { name: 'Home', path: '/' },
  login: { name: 'Login', path: '/login' },
  register: { name: 'Register', path: '/register' },
  completeRegistration: {
    name: 'Complete Registration',
    path: '/register/complete',
  },
  cart: { name: 'Cart', path: '/cart' },
};

const CustomNavLink = ({ menu, path, current, setCurrent, children }) => {
  return (
    <MDBNavItem className={menu === current ? 'active' : ''}>
      <MDBNavLink to={path} onClick={() => setCurrent(menu)}>
        {children}
        {menu}
      </MDBNavLink>
    </MDBNavItem>
  );
};

export const Nav = () => {
  const [current, setCurrent] = useState(menus.home);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        <strong className="white-text">E-COM</strong>
      </MDBNavbarBrand>

      <MDBNavbarToggler onClick={toggleCollapse} />

      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav left>
          <CustomNavLink
            current={current}
            setCurrent={setCurrent}
            path={home.path}
            menu={home.name}
          >
            <MDBIcon icon="home" className="pr-1" />
          </CustomNavLink>
          <CustomNavLink
            current={current}
            setCurrent={setCurrent}
            path={cart.path}
            menu={cart.name}
          >
            <MDBIcon icon="shopping-cart" className="pr-1" />
          </CustomNavLink>
          <CustomNavLink
            current={current}
            setCurrent={setCurrent}
            path={menus.completeRegistration.path}
            menu={menus.completeRegistration.name}
          >
            <MDBIcon icon="shopping-cart" className="pr-1" />
          </CustomNavLink>
        </MDBNavbarNav>

        <MDBNavbarNav right>
          <CustomNavLink
            current={current}
            setCurrent={setCurrent}
            path={register.path}
            menu={register.name}
          >
            <MDBIcon icon="user-alt" className="pr-1" />
          </CustomNavLink>
          <CustomNavLink
            current={current}
            setCurrent={setCurrent}
            path={login.path}
            menu={login.name}
          >
            <MDBIcon icon="sign-in-alt" className="pr-1" />
          </CustomNavLink>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
};
