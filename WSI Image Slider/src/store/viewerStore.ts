import { create } from 'zustand';
import OpenSeadragon from 'openseadragon';

interface ViewerStore {
  viewer: OpenSeadragon.Viewer | null;
  setViewer: (viewer: OpenSeadragon.Viewer) => void;
}

export const useViewerStore = create<ViewerStore>((set) => ({
  viewer: null,
  setViewer: (viewer) => set({ viewer }),
}));