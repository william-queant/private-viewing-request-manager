export interface User {
  name: string;
  image: string;
  role: "Property Manager" | "Potential Tenant";
  isConnected: boolean;
  phone: string;
  email: string;
}
