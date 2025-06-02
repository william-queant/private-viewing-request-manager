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
  approveSlotAndRemoveOthers: (slot: TimeSlot) => void;
  refuseSlot: (slot: TimeSlot) => void;
  getSlotsByUser: (user: User) => TimeSlot[];
  getBookedSlotsForDateTime: (day: string, time: string) => TimeSlot[];
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

      getBookedSlotsForDateTime: (day: string, time: string) => {
        const state = get();
        return state.selectedSlots.filter(
          (slot) =>
            slot.day === day && slot.time === time && slot.status === "Booked"
        );
      },

      approveSlotAndRemoveOthers: (slot: TimeSlot) => {
        set((state) => {
          const updatedSlots = state.selectedSlots.map((existingSlot) => {
            // If this is the slot being approved, change its status to "Booked"
            if (
              existingSlot.day === slot.day &&
              existingSlot.time === slot.time &&
              existingSlot.user.id === slot.user.id &&
              existingSlot.status === "Pending"
            ) {
              return { ...existingSlot, status: "Booked" as TimeSlotStatus };
            }
            return existingSlot;
          });

          // Remove all other pending slots from the same user AND
          // remove any other pending slots for the same date/time (from any user)
          const finalSlots = updatedSlots.filter((existingSlot) => {
            // Keep the slot if it's the one we just approved
            const isApprovedSlot =
              existingSlot.day === slot.day &&
              existingSlot.time === slot.time &&
              existingSlot.user.id === slot.user.id;

            // Remove any pending slot from the same user (except the approved one)
            const isPendingFromSameUser =
              existingSlot.user.id === slot.user.id &&
              existingSlot.status === "Pending";

            // Remove any pending slot for the same date/time from ANY user (except the approved one)
            const isPendingForSameDateTime =
              existingSlot.day === slot.day &&
              existingSlot.time === slot.time &&
              existingSlot.status !== "Booked";

            // Keep the slot if:
            // - It's the approved slot, OR
            // - It's not a pending slot from the same user, AND
            // - It's not a pending slot for the same date/time
            return (
              isApprovedSlot ||
              (!isPendingFromSameUser && !isPendingForSameDateTime)
            );
          });
          return { selectedSlots: finalSlots };
        });
      },

      refuseSlot: (slot: TimeSlot) => {
        set((state) => {
          console.log(
            `Refusing slot for ${slot.user.name} on ${slot.day} at ${slot.time}`
          );
          return {
            selectedSlots: state.selectedSlots.filter(
              (existingSlot) =>
                !(
                  existingSlot.day === slot.day &&
                  existingSlot.time === slot.time &&
                  existingSlot.user.id === slot.user.id
                )
            ),
          };
        });
      },
    }),
    {
      name: "selected-slots-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
