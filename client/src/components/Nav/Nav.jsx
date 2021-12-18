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
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdbreact';
import { auth } from '../../util';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../state';
import { Link, useHistory } from 'react-router-dom';

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
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const { home, cart, login, register, logout } = menus;

  function toggleCollapse() {
    setIsOpen(!isOpen);
  }

  function handleSignOut() {
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

  const logInMenus = (
    <>
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
        path={register.path}
        menu={register.name}
      >
        <MDBIcon icon="user-alt" className="pr-1" />
      </CustomNavLink>
    </>
  );

  const logOutMenus = (
    <MDBNavItem className="avatar">
      <MDBDropdown>
        <MDBDropdownToggle nav caret>
          <img
            src="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg"
            className="rounded-circle z-depth-0"
            alt="avatar image"
          />{' '}
          {user && user.email.split('@')[0]}
        </MDBDropdownToggle>
        <MDBDropdownMenu className="dropdown-default" color="primary">
          <MDBDropdownItem href="#!">Action</MDBDropdownItem>
          <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
          <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
          <MDBDropdownItem divider />
          <MDBDropdownItem onClick={handleSignOut}>
            <MDBIcon icon="sign-out-alt" className="pr-1" /> {logout.name}
          </MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    </MDBNavItem>
  );

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
        </MDBNavbarNav>

        <MDBNavbarNav right>{user ? logOutMenus : logInMenus}</MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
};
