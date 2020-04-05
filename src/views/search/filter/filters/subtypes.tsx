import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchParam,
  selectParams
} from "../../../../app/store/slices/search-params";

// TODO: Find full list https://github.com/PokemonTCG/pokemon-tcg-data ?

const options = [
  "EX",
  "Special",
  "Restored",
  "Level Up",
  "MEGA",
  "Technical Machine",
  "Item",
  "Stadium",
  "Supporter",
  "Stage 1",
  "GX",
  "Pokémon Tool",
  "Basic",
  "LEGEND",
  "Stage 2",
  "BREAK",
  "Rocket's Secret Machine"
];

const SubtypeFilter = () => {
  const { subtype: subtypeString } = useSelector(selectParams);
  const dispatch = useDispatch();
  let subtype: string[];
  if (subtypeString && typeof subtypeString === "string") {
    subtype = subtypeString.split("|");
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(
        setSearchParam({
          name: "subtype",
          value: subtypeString
            ? `${subtypeString}|${event.target.name}`
            : event.target.name
        })
      );
    } else {
      if (subtype) {
        const filtered = subtype.filter(v => v !== event.target.name);
        dispatch(
          setSearchParam({ name: "subtype", value: filtered.join("|") })
        );
      }
    }
  };

  return (
    <FormGroup>
      {options.map((o: string, index: number) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={!!subtype && subtype.includes(o)}
              onChange={handleChange}
              name={o}
            />
          }
          label={o}
        />
      ))}
    </FormGroup>
  );
};

export default SubtypeFilter;
