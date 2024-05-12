import React, { useState } from "react";
import { FormControl, Input } from "@mui/material";

export type SearchBarProps = {
  onSearchChange: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchBar = (props: SearchBarProps) => {
  const { onSearchChange } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [typingTimeout, setTypingTimeout] = useState<number | null>(null);

  const handleSearchChange = (event: { target: { value: string } }) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        onSearchChange(value);
      }, 1000)
    );
  };

  return (
    <FormControl fullWidth variant="filled">
      <Input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </FormControl>
  );
};
