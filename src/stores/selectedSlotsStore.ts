import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { TimeSlot, TimeSlotStatus } from "~/types/Time";
import type { User } from "~/types/User";

interface SelectedSlotsStore {
  selectedSlots: TimeSlot[];
  addSlot: (slot: TimeSlot) => void;
  removeSlot: (slot: TimeSlot) => void;
  clearSlots: (user: User) => void;
  updateSlotStatus: (slot: TimeSlot, newStatus: TimeSlotStatus) => void;
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

      updateSlotStatus: (slot: TimeSlot, newStatus: TimeSlotStatus) => {
        set((state) => ({
          selectedSlots: state.selectedSlots.map((existingSlot) =>
            existingSlot.day === slot.day &&
            existingSlot.time === slot.time &&
            existingSlot.user.id === slot.user.id
              ? { ...existingSlot, status: newStatus }
              : existingSlot
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
