import React from "react";
import "./NavbarComponent.css";
import { useSelector } from 'react-redux';

export const NavbarComponent = () => {

  const authResponse = useSelector((state: any) => state.user.user.displayName);

  return (
    <nav className="navbar myNavbar navbar-dark">

      <h3>Progetto REACT MICROSOFT TEAMS</h3>
      <div className="navbar-nav ">

        <p className='username'>{authResponse}</p>

      </div>
    </nav>
  );
}
