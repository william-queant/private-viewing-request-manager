import type { User } from "~/types/User";
import usersData from "~/data/users.json";

// Cache for dynamically loaded images
const imageCache = new Map<string, string>();

// Dynamically import avatar image
const importAvatar = async (filename: string): Promise<string> => {
  if (imageCache.has(filename)) {
    return imageCache.get(filename)!;
  }

  try {
    // Extract the name without extension and the extension
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
    const ext = filename.split(".").pop() || "jpg";

    // Dynamically import the image with proper static analysis support
    const module = await import(`~/assets/avatars/${nameWithoutExt}.${ext}`);
    const imageSrc = module.default;
    imageCache.set(filename, imageSrc);
    return imageSrc;
  } catch (error) {
    console.warn(`Failed to load avatar: ${filename}`, error);
    return filename; // Fallback to filename if import fails
  }
};

// Transform the JSON data and dynamically load images
export const loadUsers = async (): Promise<User[]> => {
  const users = usersData as User[];

  const usersWithImages = await Promise.all(
    users.map(async (user: User) => ({
      ...user,
      image: await importAvatar(user.image),
      isConnected: user.role === "Property Manager",
    }))
  );

  return usersWithImages;
};

// Synchronous version that returns users with placeholder images initially
export const loadUsersSync = (): User[] => {
  const users = usersData as User[];
  return users.map((user: User) => ({
    ...user,
    image: user.image, // Will be updated when async version loads
    isConnected: user.role === "Property Manager",
  }));
};

// Extract initials from a name
export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
