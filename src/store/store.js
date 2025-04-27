import { create } from "zustand";

const useStore = create((set) => ({
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),
  selectedPlace: null,
  setSelectedPlace: (place) => set({ selectedPlace: place }),
}));

export default useStore;
