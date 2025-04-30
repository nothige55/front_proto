import { useEffect, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

function useAutoSuggestion(input, sessionToken) {
  const placeLib = useMapsLibrary("places");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!placeLib) return;
    if (!input) {
      setSuggestions([]);
      return;
    }

    (async () => {
      try {
        const request = {
          input: input,
          sessionToken: sessionToken,
          origin: { lat: 34.6937, lng: 135.5023 },
        };

        const { suggestions: rawSuggestions } =
          await placeLib.AutocompleteSuggestion.fetchAutocompleteSuggestions(
            request
          );

        const detailedSuggestions = rawSuggestions.map((suggestion) => ({
          // label: suggestion.queryPrediction.text.text, // 장소 이름
          label: suggestion.placePrediction.mainText.text,
          place_id: suggestion.placePrediction.placeId, // 장소 ID
        }));

        // const detailedSuggestions = await Promise.all(
        //   rawSuggestions.map(async (suggestion) => {
        //     const place = suggestion.placePrediction.toPlace();
        //     await place.fetchFields({
        //       fields: ["displayName", "formattedAddress", "id"],
        //     });
        //     return { label: place.displayName, place_id: place.id };
        //   })
        // );
        console.log(detailedSuggestions);
        setSuggestions(detailedSuggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    })();
  }, [input, placeLib, sessionToken]);

  return suggestions;
}

export default useAutoSuggestion;
