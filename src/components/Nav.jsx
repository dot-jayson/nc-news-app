import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex justify-around mb-5">
      <Link to="/">Home</Link>
      <Link to="/articles">Articles</Link>
      <Link to="/users">Users</Link>
    </nav>
  );
};

export default Nav;
