import React, { useState } from 'react';
import { signOut } from 'firebase/auth';

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
import { auth } from '../../util';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../../state';
import { useHistory } from 'react-router-dom';

const menus = {
  home: { name: 'Home', path: '/' },
  login: { name: 'Sign In', path: '/login' },
  register: { name: 'Sign Up', path: '/register' },
  logout: { name: 'Sign Out', path: '/logout' },
  completeRegistration: {
    name: 'Complete Registration',
    path: '/register/complete',
  },
  cart: { name: 'Cart', path: '/cart' },
};

const CustomNavLink = ({ menu, path, current, setCurrent, children }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  function onClickHandler() {
    setCurrent(menu);

    if (menu === menus.logout.name) {
      signOut(auth)
        .then(() => {
          dispatch(logOutUser());
          history.push(menus.login.path);
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.message);
        });
    }
  }

  return (
    <MDBNavItem className={menu === current ? 'active' : ''}>
      <MDBNavLink to={path} onClick={onClickHandler}>
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

  const { home, cart, login, register, logout } = menus;

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
          <CustomNavLink
            current={current}
            setCurrent={setCurrent}
            path={logout.path}
            menu={logout.name}
          >
            <MDBIcon icon="sign-out-alt" className="pr-1" />
          </CustomNavLink>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
};
