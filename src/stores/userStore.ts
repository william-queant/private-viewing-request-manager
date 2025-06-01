import { create } from "zustand";
import type { User } from "~/types/User";
import { loadUsers, loadUsersSync } from "~/utils/loadUsers";

interface UserStore {
  users: User[];
  isLoading: boolean;
  setUsers: (users: User[]) => void;
  loadUsersAsync: () => Promise<void>;
  addUser: (user: User) => void;
  removeUser: (email: string) => void;
  updateUser: (email: string, updatedUser: Partial<User>) => void;
}

// Start with synchronous users (without images loaded)
const initialUsers: User[] = loadUsersSync();

export const useUserStore = create<UserStore>((set) => ({
  users: initialUsers,
  isLoading: false,
  setUsers: (users) => set({ users }),
  loadUsersAsync: async () => {
    set({ isLoading: true });
    try {
      const usersWithImages = await loadUsers();
      set({ users: usersWithImages, isLoading: false });
    } catch (error) {
      console.error("Failed to load users with images:", error);
      set({ isLoading: false });
    }
  },
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  removeUser: (email) =>
    set((state) => ({
      users: state.users.filter((user) => user.email !== email),
    })),
  updateUser: (email, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.email === email ? { ...user, ...updatedUser } : user
      ),
    })),
}));
