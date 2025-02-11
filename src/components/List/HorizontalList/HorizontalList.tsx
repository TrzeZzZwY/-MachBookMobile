import { useState } from "react";
import { FlatList, View } from "react-native";
import { IdType } from "types/IdType";

export type HorizontalListProps<T extends IdType> = {
  renderColumn: (item: T) => React.ReactElement | React.ReactElement[];
  onRefresh: () => Promise<void>;
  data: T[];
};

export default function HorizontalList<T extends IdType>({
  renderColumn,
  onRefresh,
  data,
}: HorizontalListProps<T>) {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefreshInternal = () => {
    setRefreshing(true);
    onRefresh().finally(() => setRefreshing(false));
  };
  return (
    <FlatList
      data={data}
      horizontal={true}
      onRefresh={onRefreshInternal}
      refreshing={refreshing}
      renderItem={(info) => <>{renderColumn(info.item)}</>}
    />
  );
}
