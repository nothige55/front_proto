import React, { useState, useRef } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import CreateMarker from "../Marker/CreateMarker";
import textSearch from "../../utils/textSearch";
import useAutoSuggestion from "../../hooks/useAutoSuggestion";

function PlaceSearch() {
  const [inputValue, setInputValue] = useState("");
  const placeLib = useMapsLibrary("places");
  const sessionTokenRef = useRef(null);
  const map = useMap();

  const suggestions = useAutoSuggestion(inputValue, sessionTokenRef.current);

  const handleInputChange = (event, value) => {
    setInputValue(value);
    if (!sessionTokenRef.current && placeLib) {
      sessionTokenRef.current = new placeLib.AutocompleteSessionToken();
      console.log("세션 토큰 생성됨:", sessionTokenRef.current);
    }
  };

  const handlePlaceSelected = async (input) => {
    const { places } = await textSearch(inputValue, { Place: placeLib.Place });
    console.log("장소 선택됨:", places);
    CreateMarker(map, places);
    sessionTokenRef.current = null;
  };

  return (
    <div
      style={{
        top: 16,
        left: 16,
        right: 16,
        zIndex: 1000,
        backgroundColor: "white",
        width: 300,
      }}
    >
      <Autocomplete
        freeSolo
        options={suggestions}
        getOptionLabel={(option) => option.label || ""}
        onInputChange={handleInputChange}
        onChange={(value) => handlePlaceSelected(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="장소 검색"
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option.place_id}>
            {option.label}
          </li>
        )}
      />
    </div>
  );
}

export default PlaceSearch;
