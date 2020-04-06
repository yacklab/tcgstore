import React, { useEffect, useState } from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { useSelector, useDispatch } from "react-redux";
import {
  selectNameParam,
  setSearchParam
} from "../app/store/slices/search-params";

const SearchInput: React.FC<TextFieldProps> = props => {
  const name = useSelector(selectNameParam);
  const dispatch = useDispatch();
  const [value, setValue] = useState(name);
  useEffect(() => {
    setValue(name);
  }, [name]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.currentTarget.value);
  };

  return (
    <TextField
      {...props}
      onKeyDown={e => {
        if (e.keyCode === 13) {
          e.preventDefault();
          dispatch(setSearchParam({ name: "name", value }));
        }
      }}
      value={value}
      onChange={onChange}
      spellCheck="false"
      size="small"
      label="Search by name"
      variant="outlined"
    />
  );
};

export default SearchInput;
