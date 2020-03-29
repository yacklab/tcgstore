import React from "react";
import { appRoutes } from "../../app/router/routes";
import { Link } from "react-router-dom";

const Home = () => {
  const c = appRoutes.search.getPath([{ name: "name", value: "Pikachu" }]);
  return (
    <div>
      <Link to={c}>Look a Pikachu</Link>
    </div>
  );
};

export default Home;
