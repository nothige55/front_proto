async function TextSearch(input, { Place }) {
  const request = {
    textQuery: input,
    fields: ["displayName", "location", "id"],
    maxResultCount: 10,
  };
  const { places } = await Place.searchByText(request);
  return { places };
}

export default TextSearch;

// const handleTextSearch = async () => {
//     const { Place } = placeLib;
//     const request = {
//       textQuery: inputValue,
//       fields: ["displayName", "location", "id"],
//       maxResultCount: 10,
//     };
//     const { places } = await Place.searchByText(request);
//     CreateMarker(map, places);
//   };
