import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/User";

const Home = () => {
  const { signedInUser } = useContext(UserContext);
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <h1 className="text-xl ">Welcome to NC News {signedInUser}!</h1>
    </div>
  );
};

export default Home;
