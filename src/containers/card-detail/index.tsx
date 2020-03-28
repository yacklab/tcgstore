import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCardDetail,
  fetchCard
} from "../../app/store/slices/card-details";
import { SliceStatus } from "../../app/store/types";
import { Link } from "react-router-dom";
import { appRoutes } from "../../app/router/routes";
import Button from "@material-ui/core/Button";
import { addToBaket } from "../../app/store/slices/basket";

const CardDetail: React.FC<{ id: string }> = ({ id }) => {
  const cardDetail = useSelector(selectCardDetail(id));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCard(id));
  });

  return cardDetail.status === SliceStatus.IDLE ? (
    <div>
      {/* {JSON.stringify(cardDetail.card)} */}
      <Link to={appRoutes.details.getPath(id)}>go</Link>
      <Button onClick={() => dispatch(addToBaket(id))}>add</Button>
    </div>
  ) : (
    <div>loading</div>
  );
};

export default CardDetail;
