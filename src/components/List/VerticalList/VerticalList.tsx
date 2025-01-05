import { FlatList } from "react-native";
import ListHeader from "../ListHeader";
import ListWrapper from "../ListWrapper";
import VerticalListRow from "./VerticalListRow";
import VerticalListContent from "./VerticalListContent";
import { UserBookItemType } from "../../../types/UserBookItemType";

export type VerticalListProps = {
  header: string,
  children: React.ReactElement | React.ReactElement[],
  data: UserBookItemType[]
}

export default function VerticalList({data,children,header}: VerticalListProps) {

  return (
    <ListWrapper>
      <ListHeader text={header} />
      <VerticalListContent>
        <FlatList
          data={data}
          renderItem={(item) => (
            <VerticalListRow data={item.item}>
              {children}
            </VerticalListRow>
          )}
        />
      </VerticalListContent>
    </ListWrapper>
  );
}
