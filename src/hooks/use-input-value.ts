import { useState } from "react";

export const useInputValue = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setValue(e.currentTarget.value);
    }
  };
};
