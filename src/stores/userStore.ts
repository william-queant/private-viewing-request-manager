import { create } from "zustand";
import type { User } from "~/types/User";
import AvaWrightImage from "~/assets/AvaWright.jpg";
import RyanFoxImage from "~/assets/RyanFox.jpg";
import SallyMasonImage from "~/assets/SallyMason.jpg";
import BenWalterImage from "~/assets/BenWalter.jpg";
import FrankWhitakerImage from "~/assets/FrankWhitaker.jpg";

interface UserStore {
  users: User[];
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  removeUser: (email: string) => void;
  updateUser: (email: string, updatedUser: Partial<User>) => void;
}

const initialUsers: User[] = [
  {
    name: "Ava Wright",
    image: AvaWrightImage,
    role: "Property Manager",
    phone: "+64 21 456 7890",
    email: "ava.wright@easyrental.co.nz",
  },
  {
    name: "Ryan Fox",
    image: RyanFoxImage,
    role: "Potential Tenant",
    phone: "+64 27 123 4567",
    email: "ryan.fox@gmail.com",
  },
  {
    name: "Sally Mason",
    image: SallyMasonImage,
    role: "Potential Tenant",
    phone: "+64 22 987 6543",
    email: "sally.mason@gmail.com",
  },
  {
    name: "Ben Walter",
    image: BenWalterImage,
    role: "Potential Tenant",
    phone: "+64 223 857 1887",
    email: "ben.walter@xero.co.nz",
  },
  {
    name: "Frank Whitaker",
    image: FrankWhitakerImage,
    role: "Potential Tenant",
    phone: "+64 21 111 8897",
    email: "frank_whitaker512@gmail.com",
  },
];

export const useUserStore = create<UserStore>((set) => ({
  users: initialUsers,
  setUsers: (users) => set({ users }),
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
