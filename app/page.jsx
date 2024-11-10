import Feed from "@components/Feed";
import React from "react";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="text-center">Welcome to Clothrecom</h1>
      <p className="text-center">
        This is a sample website made with Clothrecom
      </p>

      <Feed />
    </section>
  );
};

export default Home;
