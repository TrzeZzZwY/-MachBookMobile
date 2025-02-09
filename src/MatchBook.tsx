import GlobalContextWrapper from "./contexts/GlobalContextWrapper";
import MainContainer from "./MainContainer";

export default function MatchBook() {
  return (
    <GlobalContextWrapper>
      <MainContainer />
    </GlobalContextWrapper>
  );
}
