import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { weekDays, type Day } from "~/types/Time";

interface IsRequestAllowedStore {
  isRequestAllowed: boolean;
  setRequestAllowed: (allowed: boolean) => void;
  toggleRequestAllowed: () => void;
}

interface OpenDaysStore {
  openDays: Day[];
  setOpenDays: (days: Day[]) => void;
  toggleOpenDay: (day: Day) => void;
}

interface GlobalHourStore {
  globalFromHour: string;
  globalToHour: string;
  duration: number; // Duration in minutes, default to 15 minutes
  setGlobalFromHour: (hour: string) => void;
  setGlobalToHour: (hour: string) => void;
}

export const usePrivateViewSettingsStore = create<
  IsRequestAllowedStore & OpenDaysStore & GlobalHourStore
>()(
  persist(
    (set) => {
      // isRequestAllowedStore
      // This store manages the state of whether private viewing requests are allowed
      const isRequestAllowedStore: IsRequestAllowedStore = {
        isRequestAllowed: false,

        setRequestAllowed: (allowed: boolean) =>
          set({ isRequestAllowed: allowed }),

        toggleRequestAllowed: () =>
          set((state) => ({
            isRequestAllowed: !state.isRequestAllowed,
          })),
      };

      // openDaysStore
      const openDaysStore: OpenDaysStore = {
        openDays: [...weekDays], // Default to all days of the week

        setOpenDays: (days) => set({ openDays: days }),

        toggleOpenDay: (day) =>
          set((state) => {
            const currentDays = new Set(state.openDays);
            if (currentDays.has(day)) {
              currentDays.delete(day); // Remove the day if it exists
            } else {
              currentDays.add(day); // Add the day if it doesn't exist
            }
            return {
              openDays: Array.from(currentDays).sort((a, b) => {
                return weekDays.indexOf(a) - weekDays.indexOf(b);
              }),
            }; // Sort the days
          }),
      };

      // globalFromHourStore
      // This store manages the global "from" hour for private viewings
      const globalHourStore: GlobalHourStore = {
        globalFromHour: "10:00", // Default to 10:00 AM
        setGlobalFromHour: (hour) => set({ globalFromHour: hour }),

        globalToHour: "17:00", // Default to 5:00 PM
        setGlobalToHour: (hour) => set({ globalToHour: hour }),

        duration: 15, // Default duration in minutes
      };

      return {
        ...isRequestAllowedStore,
        ...openDaysStore,
        ...globalHourStore,
      };
    },
    {
      name: "private-view-settings-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
