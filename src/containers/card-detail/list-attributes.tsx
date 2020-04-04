import React, { ReactNode } from "react";
import { ICard } from "pokemon-tcg-sdk-typescript/dist/interfaces/card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

export type AttributeKeysLabelMap = {
  key: keyof ICard;
  label: string;
  component?: React.FunctionComponent<any>;
};

const ListAttributes: React.FC<{
  card: ICard;
  attributes: AttributeKeysLabelMap[];
}> = ({ card, attributes }) => {
  return (
    <List dense>
      {attributes.reduce((acc, current) => {
        if (card[current.key]) {
          const Component = current.component;
          acc.push(
            <ListItem key={`${current.label}-${card[current.key]}`}>
              {!Component ? (
                <React.Fragment>
                  <span style={{ fontWeight: "bold", marginRight: "4px" }}>
                    {`${current.label}: `}
                  </span>
                  <span>{card[current.key]}</span>
                </React.Fragment>
              ) : (
                <Component
                  {...{ [current.key]: card[current.key] }}
                  label={current.label}
                />
              )}
            </ListItem>
          );
        }
        return acc;
      }, [] as ReactNode[])}
    </List>
  );
};

export default ListAttributes;
