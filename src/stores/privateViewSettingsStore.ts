import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface PrivateViewSettingsStore {
  isRequestAllowed: boolean;
  setRequestAllowed: (allowed: boolean) => void;
  toggleRequestAllowed: () => void;
}

export const usePrivateViewSettingsStore = create<PrivateViewSettingsStore>()(
  persist(
    (set) => ({
      isRequestAllowed: false,

      setRequestAllowed: (allowed) => set({ isRequestAllowed: allowed }),

      toggleRequestAllowed: () =>
        set((state) => ({
          isRequestAllowed: !state.isRequestAllowed,
        })),
    }),
    {
      name: "private-view-settings-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
