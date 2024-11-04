import React from "react";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="flex flex-col gap-5 bg-blue-100">
      <h1 className="text-center mt-5">NC News</h1>
      <Nav />
    </header>
  );
};

export default Header;
