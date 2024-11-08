import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/User";

const Home = () => {
  const { signedInUser } = useContext(UserContext);
  return (
    <h1 className="text-2xl text-center">Welcome to NC News {signedInUser}!</h1>
  );
};

export default Home;
