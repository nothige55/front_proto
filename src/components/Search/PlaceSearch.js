import React, { useState, useRef, useEffect } from "react";
import { Autocomplete, TextField, InputAdornment } from "@mui/material";
import AutoSuggestion from "./AutoSuggestion";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import CreateMarker from "../Marker/CreateMarker";
import TextSearch from "./TextSearch";

function PlaceSearch() {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const placeLib = useMapsLibrary("places");
  const sessionTokenRef = useRef(null);
  const map = useMap();

  const handleInputChange = (event, value) => {
    setInputValue(value);
    if (!sessionTokenRef.current && placeLib) {
      sessionTokenRef.current = new placeLib.AutocompleteSessionToken();
      console.log("세션 토큰 생성됨:", sessionTokenRef.current);
    }
  };

  const handlePlaceSelected = async (input) => {
    if (!input) {
      console.log("선택된 장소가 없습니다.");
      return;
    }

    const { places } = await TextSearch(inputValue, { Place: placeLib.Place });
    console.log("장소 선택됨:", places);
    CreateMarker(map, places);
    sessionTokenRef.current = null;
  };

  return (
    <div
      style={{
        //position: "absolute",
        top: 16,
        left: 16,
        right: 16,
        zIndex: 1000,
        backgroundColor: "white",
        width: 300,
      }}
    >
      <AutoSuggestion
        input={inputValue}
        onSuggestions={setOptions}
        sessionToken={sessionTokenRef.current}
      />
      <Autocomplete
        freeSolo
        options={options}
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
