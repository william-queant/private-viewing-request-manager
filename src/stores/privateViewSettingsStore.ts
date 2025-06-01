import { create } from "zustand";

interface PrivateViewSettingsStore {
  isPrivateViewingRequestAllowed: boolean;
  setPrivateViewingRequestAllowed: (allowed: boolean) => void;
  togglePrivateViewingRequestAllowed: () => void;
}

export const usePrivateViewSettingsStore = create<PrivateViewSettingsStore>(
  (set) => ({
    isPrivateViewingRequestAllowed: false,

    setPrivateViewingRequestAllowed: (allowed) =>
      set({ isPrivateViewingRequestAllowed: allowed }),

    togglePrivateViewingRequestAllowed: () =>
      set((state) => ({
        isPrivateViewingRequestAllowed: !state.isPrivateViewingRequestAllowed,
      })),
  })
);
