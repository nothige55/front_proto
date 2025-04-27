import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import CreateMarker from "../../utils/createMarker";
import textSearch from "../../utils/textSearch";
import useAutoSuggestion from "../../hooks/useAutoSuggestion";
import useSessionToken from "../../hooks/useSessionToken";
import SearchBox from "./SearchBox";

function PlaceSearch() {
  const [inputValue, setInputValue] = useState("");
  const [sessionToken, setSessionToken] = useState(null); // 세션 토큰 상태 관리
  const placeLib = useMapsLibrary("places");
  const map = useMap();

  const { getSessionToken, clearSessionToken } = useSessionToken(placeLib);

  const suggestions = useAutoSuggestion(inputValue, sessionToken);

  const handleInputChange = (event, value) => {
    setInputValue(value);

    // 입력값이 있을 때만 세션 토큰 생성
    if (value && !sessionToken) {
      const token = getSessionToken();
      setSessionToken(token);
    }
  };

  const handlePlaceSelected = async () => {
    const { places } = await textSearch(inputValue, { Place: placeLib.Place });
    console.log("장소 선택됨:", places);
    CreateMarker(map, places);

    // 세션 토큰 초기화
    clearSessionToken();
    setSessionToken(null);
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
      {/* <Autocomplete
        freeSolo
        options={suggestions}
        getOptionLabel={(option) => option.label || ""}
        onInputChange={handleInputChange}
        onChange={(event, value) => handlePlaceSelected(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="장소 검색"
            variant="outlined"
            fullWidth
          />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option.place_id}>
            {option.label}
          </li>
        )}
      /> */}
      <SearchBox
        suggestions={suggestions}
        onInputChange={handleInputChange}
        // onSelected={(event, value) => handlePlaceSelected(value)}
        onSelected={handlePlaceSelected}
      />
    </div>
  );
}

export default PlaceSearch;
