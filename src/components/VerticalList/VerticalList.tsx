import { FlatList, Text } from "react-native";
import ListHeader from "../ListHeader";
import ListWrapper from "../ListWrapper";
import { Asset} from "expo-asset";
import VerticalListRow from "./VerticalListRow";
import VerticalListContent from "./VerticalListContent";
export type BookListRowEntry = {
  image: Asset;
  title: string;
  author: string;
  bookId: number;
};

export type VerticalListProps = {
  header: string,
  children: React.ReactElement | React.ReactElement[],
  data: BookListRowEntry[]
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
