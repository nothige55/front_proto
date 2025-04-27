async function useTextSearch(input, { Place }) {
  const request = {
    textQuery: input,
    fields: ["displayName", "location", "id"],
    maxResultCount: 10,
  };
  const { places } = await Place.searchByText(request);
  return { places };
}

export default useTextSearch;
