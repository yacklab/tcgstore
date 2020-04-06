import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchParam,
  selectParams
} from "../../../../app/store/slices/search-params";

// TODO: Find full list https://github.com/PokemonTCG/pokemon-tcg-data ?

const options = [
  "Common",
  "Uncommon",
  "Rare Holo",
  "Rare",
  "Rare Holo EX",
  "LEGEND"
];

const RarityFilter = () => {
  const { rarity: rarityString } = useSelector(selectParams);
  const dispatch = useDispatch();
  let rarities: string[];
  if (rarityString && typeof rarityString === "string") {
    rarities = rarityString.split("|");
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(
        setSearchParam({
          name: "rarity",
          value: rarityString
            ? `${rarityString}|${event.target.name}`
            : event.target.name
        })
      );
    } else {
      if (rarities) {
        const filtered = rarities.filter(v => v !== event.target.name);
        dispatch(setSearchParam({ name: "rarity", value: filtered.join("|") }));
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
              checked={!!rarities && rarities.includes(o)}
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

export default RarityFilter;
