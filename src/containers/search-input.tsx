import React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { useInputValue } from "../hooks/use-input-value";
import { useSelector, useDispatch } from "react-redux";
import {
  selectNameParam,
  setSearchParam
} from "../app/store/slices/search-params";

const SearchInput: React.FC<TextFieldProps> = props => {
  const name = useSelector(selectNameParam);
  const handler = useInputValue(name);
  const dispatch = useDispatch();

  return (
    <TextField
      {...props}
      onKeyDown={e => {
        if (e.keyCode === 13) {
          e.preventDefault();
          dispatch(setSearchParam({ name: "name", value: handler.value }));
        }
      }}
      {...handler}
      spellCheck="false"
      size="small"
      label="Search by name"
      variant="outlined"
    />
  );
};

export default SearchInput;
