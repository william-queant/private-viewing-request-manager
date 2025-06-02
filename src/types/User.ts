export interface User {
  id: string;
  name: string;
  image: string;
  role: "Property Manager" | "Potential Tenant";
  isConnected: boolean;
  phone: string;
  email: string;
  hidden?: boolean; // Optional property to hide the user
}

export interface UserCard {
  user: User;
  onClick?: () => void;
}
