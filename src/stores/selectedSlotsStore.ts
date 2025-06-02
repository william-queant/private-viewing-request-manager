import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { TimeSlot } from "~/types/Time";
import type { User } from "~/types/User";

interface SelectedSlotsStore {
  selectedSlots: TimeSlot[];
  addSlot: (slot: TimeSlot) => void;
  removeSlot: (slot: TimeSlot) => void;
  clearSlots: (user: User) => void;
}

export const useSelectedSlotsStore = create<SelectedSlotsStore>()(
  persist(
    (set) => ({
      selectedSlots: [],

      addSlot: (slot: TimeSlot) => {
        set((state) => {
          // Check if slot is already selected
          const isAlreadySelected = state.selectedSlots.some(
            (existingSlot) =>
              existingSlot.day === slot.day &&
              existingSlot.time === slot.time &&
              existingSlot.user === slot.user &&
              existingSlot.status === "Available"
          );

          if (isAlreadySelected || state.selectedSlots.length >= 3) {
            return state;
          }

          return {
            selectedSlots: [
              ...state.selectedSlots,
              { ...slot, status: "Pending" },
            ],
          };
        });
      },

      removeSlot: (slot: TimeSlot) => {
        set((state) => ({
          selectedSlots: state.selectedSlots.filter(
            (existingSlot) =>
              !(
                existingSlot.day === slot.day &&
                existingSlot.time === slot.time &&
                existingSlot.user === slot.user
              )
          ),
        }));
      },

      clearSlots: (user) => {
        set((state) => ({
          selectedSlots: state.selectedSlots.filter(
            (existingSlot) =>
              !(existingSlot.user === user && existingSlot.status !== "Booked")
          ),
        }));
      },
    }),
    {
      name: "selected-slots-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
