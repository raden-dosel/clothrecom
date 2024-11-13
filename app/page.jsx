import Feed from "@components/Feed";
import { Suspense } from "react";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="text-center">Welcome to Clothrecom</h1>
      <p className="text-center">
        This is a sample website made with Clothrecom
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <Feed />
      </Suspense>
    </section>
  );
};

export default Home;
