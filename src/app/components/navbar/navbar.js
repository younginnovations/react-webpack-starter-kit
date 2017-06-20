import React from "react";
import { NavLink } from "react-router-dom";
import CSSModules from 'react-css-modules';
import style from "./navbar.scss";

const Links = (props) => (


<nav className="navbar">

    <ul styleName="nav">

        <li>
           <NavLink exact to="/" activeClassName="active">Home</NavLink>
        </li>
        <li>
            <NavLink to="/about" activeClassName="active">About</NavLink>
        </li>

    </ul>

</nav>

);


export default CSSModules(Links, style, {allowMultiple: true});