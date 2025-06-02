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
  getSlotsByUser: (user: User) => TimeSlot[];
}

export const useSelectedSlotsStore = create<SelectedSlotsStore>()(
  persist(
    (set, get) => ({
      selectedSlots: [],
      addSlot: (slot: TimeSlot) => {
        set((state) => {
          // Check if slot is already selected using unique ID
          const isAlreadySelected = state.selectedSlots.some(
            (existingSlot) => existingSlot.id === slot.id
          );
          const usersSelectedSlots = get().getSlotsByUser(slot.user);

          if (isAlreadySelected || usersSelectedSlots.length >= 3) {
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
            (existingSlot) => existingSlot.id !== slot.id
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
            existingSlot.id === slot.id
              ? { ...existingSlot, status: newStatus }
              : existingSlot
          ),
        }));
      },
      getSlotsByUser: (user: User) => {
        const state = get();
        return state.selectedSlots.filter((slot) => slot.user.id === user.id);
      },
    }),
    {
      name: "selected-slots-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
