import { PortalProvider } from "@gorhom/portal";
import { UserBookContextWrapper } from "./UserBookContext/UserBookContext";

export default function GlobalContextWrapper({children} : {children: React.ReactNode | React.ReactNode[] | undefined }) {
    return (
        <UserBookContextWrapper>
            <PortalProvider>
                {children}
            </PortalProvider>
        </UserBookContextWrapper>
    )
}