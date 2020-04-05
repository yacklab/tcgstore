import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import BackIcon from "@material-ui/icons/ArrowBackIos";
import ForwardIcon from "@material-ui/icons/ArrowForwardIos";
import { useSelector, useDispatch } from "react-redux";
import { selectPage, setSearchParam } from "../app/store/slices/search-params";
import { selectStatus } from "../app/store/slices/search-results";
import { SliceStatus } from "../app/store/types";

const Pagination = () => {
  const page = useSelector(selectPage);
  const cardsStatus = useSelector(selectStatus);
  const dispatch = useDispatch();
  const changePage = (page: number) => {
    dispatch(setSearchParam({ name: "page", value: page }));
  };
  const cantGoForward =
    cardsStatus === SliceStatus.LOADING || cardsStatus === SliceStatus.EMPTY;
  return (
    <div>
      <IconButton disabled={page < 2} onClick={() => changePage(page - 1)}>
        <BackIcon />
      </IconButton>
      <Typography variant="body1" component="span">
        {page}
      </Typography>
      <IconButton disabled={cantGoForward} onClick={() => changePage(page + 1)}>
        <ForwardIcon />
      </IconButton>
    </div>
  );
};

export default Pagination;
