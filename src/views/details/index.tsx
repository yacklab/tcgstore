import React from "react";
import CardDetail from "../../containers/card-detail";
import { useParams } from "react-router";

const Details = () => {
  const { id } = useParams();
  return id ? (
    <div>
      <CardDetail id={id} />
    </div>
  ) : (
    <div>400</div>
  );
};

export default Details;
