import { FlatList, View } from "react-native";
import HorizontalListWrapper from "./HorizontalListWrapper";
import HorizontalListItem, {
  HorizontalListItemEntry,
} from "./HorizontalListItem";
import HorizontalListDeleteButton from "./HorizontalListDeleteButton";

export type HorizontalListProps = {
  data: HorizontalListItemEntry[];
};

export default function HorizontalList({ data }: HorizontalListProps) {

  const deleteAction = () => {

  }

  return (
    <HorizontalListWrapper>
      <FlatList
        data={data}
        horizontal={true}
        renderItem={(item) => (
          <HorizontalListItem item={item.item}>
            <HorizontalListDeleteButton deleteAction={deleteAction} backgroundColor={"#000000"} color={"#FFFFFF"}/>
          </HorizontalListItem>
        )}
      />
    </HorizontalListWrapper>
  );
}
