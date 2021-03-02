import React from "react";
import "./NavbarComponent.css";
import { useSelector } from 'react-redux';
import { authResponseSelector, authenticationSelector } from '../../Redux/selectors/selectors';

export const NavbarComponent = () => {

  const authResponse = useSelector(authResponseSelector);
  const authentication = useSelector(authenticationSelector);
  return (
    <div>
      {authentication && <nav className="navbar myNavbar navbar-dark">

        <h3>Progetto REACT MICROSOFT TEAMS</h3>
        <div className="navbar-nav ">

          <p className='username'>{authResponse.displayName}</p>
          <p className='username'>Account: {authResponse.userPrincipalName}</p>

        </div>
      </nav>}
    </div>
  );
}
