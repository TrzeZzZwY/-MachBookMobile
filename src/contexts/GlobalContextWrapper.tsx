import { PortalProvider } from "@gorhom/portal";
import { UserBookContextWrapper } from "./UserBookContext/UserBookContext";
import AuthProvider from "./AuthorizationContext/AuthProvider";
import { UserBookLikedContextWrapper } from "./UserBookLikedContext/UserBookLikedContext";

export default function GlobalContextWrapper({
  children,
}: {
  children: React.ReactNode | React.ReactNode[] | undefined;
}) {
  return (
    <AuthProvider>
      <UserBookContextWrapper>
        <UserBookLikedContextWrapper>
          <PortalProvider>{children}</PortalProvider>
        </UserBookLikedContextWrapper>
      </UserBookContextWrapper>
    </AuthProvider>
  );
}
