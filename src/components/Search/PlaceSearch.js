import React, { useState, useRef, useEffect } from "react";
import { Autocomplete, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AutoSuggestion from "./AutoSuggestion";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import useStore from "../../store/store";
import CreateMarker from "../Marker/CreateMarker";

function PlaceSearch() {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const placeLib = useMapsLibrary("places");
  const sessionTokenRef = useRef(null);
  const setSearchResults = useStore((state) => state.setSearchResults);
  const searchResults = useStore((state) => state.searchResults);
  const map = useMap();

  const handleInputChange = (event, value) => {
    setInputValue(value);
    if (!sessionTokenRef.current && placeLib) {
      sessionTokenRef.current = new placeLib.AutocompleteSessionToken();
      console.log("세션 토큰 생성됨:", sessionTokenRef.current);
    }
  };

  const handlePlaceSelected = (place) => {
    if (!place) {
      console.log("선택된 장소가 없습니다.");
      return;
    }

    console.log("장소 선택됨:", place);
    handleTextSearch();
    sessionTokenRef.current = null;
  };

  useEffect(() => {
    console.log("searchResults 업데이트됨:", searchResults);
  }, [searchResults]);

  const handleTextSearch = async () => {
    const { Place } = placeLib;
    const request = {
      textQuery: inputValue,
      fields: ["displayName", "location"],
      maxResultCount: 10,
    };
    const { places } = await Place.searchByText(request);
    setSearchResults(places);
    CreateMarker(map, places);
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
        onChange={(event, value) => handlePlaceSelected(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="장소 검색"
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
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
