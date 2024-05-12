import React from "react";
import { MenuItem, FormControl, Select, InputLabel, Box } from "@mui/material";

export type DropdownProps = {
  onGenderChange: React.Dispatch<React.SetStateAction<string>>;
};

export const Dropdown = (props: DropdownProps) => {
  const { onGenderChange } = props;

  const handleChange = (event: { target: { value: string } }) => {
    const selectedValue = event.target.value;
    console.log("selected", selectedValue);
    onGenderChange(selectedValue);
  };

  return (
    <Box>
      <FormControl fullWidth variant="filled">
        <InputLabel id="demo-simple-select-label" sx={{ width: "fullWidth" }}>
          Gender
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
