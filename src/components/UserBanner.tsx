import { Grid } from "@radix-ui/themes";
import type { User } from "~/types/User";
import { PropertyManagerCard } from "./UserCard";
import { PotentialTenantCard } from "./PotentialTenantCard";

interface UserBannerProps {
  users: User[];
}

export function UserBanner({ users }: UserBannerProps) {
  const propertyManager = users.find(
    (user) => user.role === "Property Manager"
  );
  const potentialTenants = users.filter(
    (user) => user.role === "Potential Tenant"
  );

  if (!propertyManager) {
    return <div>No Property Manager found</div>;
  }
  if (potentialTenants.length === 0) {
    return <div>No Potential Tenants found</div>;
  }

  return (
    <Grid
      columns={{ initial: "1", sm: "2" }}
      gap="16px"
      width="auto"
      align={"center"}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flex: "1 1 auto",
        }}
      >
        <PropertyManagerCard
          key={propertyManager.name}
          user={propertyManager}
        />
      </div>
      <div
        style={{
          display: "flex",
          minWidth: "330px",
          justifyContent: "center",
          gap: "16px",
          flex: "1 1 auto",
        }}
      >
        {potentialTenants.map((user) => (
          <PotentialTenantCard key={user.name} user={user} />
        ))}
      </div>
    </Grid>
  );
}
