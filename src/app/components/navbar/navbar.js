import React from "react";
import { Link } from "react-router-dom";

const Links = (props) => (
    <nav>
        <Link to="/">home</Link>
        <Link to="/about">about</Link>
    </nav>
);


export default Links;