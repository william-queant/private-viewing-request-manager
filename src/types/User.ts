export interface User {
  id: string;
  name: string;
  image: string;
  role: "Property Manager" | "Potential Tenant";
  isConnected: boolean;
  phone: string;
  email: string;
}
