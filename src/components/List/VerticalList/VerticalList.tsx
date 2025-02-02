import { FlatList } from "react-native";
import { useState } from "react";
import { IdType } from "../../../types/IdType";

export type VerticalListProps<T extends IdType> = {
  renderRow: (item: T) => React.ReactElement | React.ReactElement[],
  data: T[] | null,
  onRefresh: () => Promise<void>
}

export default function VerticalList<T extends IdType>({ data, renderRow, onRefresh }: VerticalListProps<T>) {

  const [refresh, setRefreshing] = useState(false);

  const onRefreshInternal = () => {
    setRefreshing(true);
    onRefresh().finally(() => setRefreshing(false))
  }

  return (
    <>
      <FlatList
        refreshing={refresh}
        onRefresh={onRefreshInternal}
        keyExtractor={(item) => item.id.toString()}
        data={data}
        renderItem={(item) => (
          <>
            {renderRow(item.item)}
          </>
        )}
      />
    </>
  );
}
