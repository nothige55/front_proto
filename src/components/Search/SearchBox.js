import { Autocomplete, TextField } from "@mui/material";

function SearchBox({ suggestions, onInputChange, onSelected }) {
  return (
    <Autocomplete
      freeSolo
      options={suggestions}
      getOptionLabel={(option) => option.label || ""}
      onInputChange={onInputChange}
      onChange={onSelected}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="장소 검색"
          slotProps={{
            input: {
              ...params.InputProps,
              style: {
                backgroundColor: "white",
              },
            },
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.place_id}>
          {option.label}
        </li>
      )}
    />
  );
}

export default SearchBox;
