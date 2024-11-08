import React from "react";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="flex flex-col gap-5 bg-[#4c7666]">
      <h1 className="text-center mt-5 text-3xl">NC News</h1>
      <Nav />
    </header>
  );
};

export default Header;
