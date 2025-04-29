import { create } from "zustand";

const useStore = create((set) => ({
  // searchResults: [],
  // setSearchResults: (results) => set({ searchResults: results }),
  selectedPlaceId: null, // 클릭된 장소의 id를 저장하는 상태
  setSelectedPlaceId: (id) => set({ selectedPlaceId: id }),
}));

export default useStore;
