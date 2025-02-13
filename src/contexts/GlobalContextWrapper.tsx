import { PortalProvider } from "@gorhom/portal";
import { UserBookContextWrapper } from "./UserBookContext/UserBookContext";
import AuthProvider from "./AuthorizationContext/AuthProvider";
import { UserBookLikedContextWrapper } from "./UserBookLikedContext/UserBookLikedContext";
import { MatchesContextWrapper } from "./MatchesContext/MatchesContext";

export default function GlobalContextWrapper({
  children,
}: {
  children: React.ReactNode | React.ReactNode[] | undefined;
}) {
  return (
    <AuthProvider>
      <UserBookContextWrapper>
        <UserBookLikedContextWrapper>
          <MatchesContextWrapper>
            <PortalProvider>{children}</PortalProvider>
          </MatchesContextWrapper>
        </UserBookLikedContextWrapper>
      </UserBookContextWrapper>
    </AuthProvider>
  );
}
