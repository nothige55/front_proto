import { useEffect } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

function AutoSuggestion({ input, onSuggestions, sessionToken }) {
  const placeLib = useMapsLibrary("places");

  useEffect(() => {
    if (!placeLib) return;
    if (!input) {
      onSuggestions([]);
      return;
    }

    (async () => {
      try {
        const request = {
          input: input,
          sessionToken: sessionToken,
          origin: { lat: 34.6937, lng: 135.5023 },
        };

        const { suggestions } =
          await placeLib.AutocompleteSuggestion.fetchAutocompleteSuggestions(
            request
          );

        const detailedSuggestions = await Promise.all(
          suggestions.map(async (suggestion) => {
            const place = suggestion.placePrediction.toPlace();
            await place.fetchFields({
              fields: ["displayName", "formattedAddress", "id"],
            });
            return { label: place.displayName, place_id: place.id };
          })
        );

        onSuggestions(detailedSuggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    })();
  }, [input, placeLib, onSuggestions, sessionToken]);

  return null;
}

export default AutoSuggestion;
