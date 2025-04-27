import { create } from "zustand";

const useStore = create((set) => ({
  // searchResults: [],
  // setSearchResults: (results) => set({ searchResults: results }),
  selectedPlaceId: null,
  setSelectedPlaceId: (id) => set({ selectedPlaceId: id }),
}));

export default useStore;
