import { View } from "react-native";
import ListHeader from "./List/ListHeader";
import VerticalList from "./List/VerticalList/VerticalList";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import useAxios from "hooks/useAxios";
import UserBookItemUrlBuilder from "services/UserBookItemUrlBuilder";
import { MatchPair, MatchType } from "types/MatchType";
import { IdType } from "types/IdType";
import MatchedBooksVerticalListRow from "./List/VerticalList/RowDefinitions/MatchedBooksVerticalListRow";

export type MatchRowType = {
  user: {
    id: number;
    firstName: string;
    lastName: string;
  };
} & MatchPair &
  IdType;

const formatMatchData = (data: MatchType): MatchRowType[] => {
  let id = 0;

  return data.matches.flatMap((match) =>
    match.matchBookPair.map((pair) => ({
      id: id++,
      ...pair,
      user: {
        id: match.userId,
        firstName: match.firstName,
        lastName: match.lastName,
      },
    }))
  );
};

export default function MatchedBooksVerticalList() {
  const [data, setData] = useState<MatchType | null>(null);
  const axios = useAxios();

  const matchData = useMemo(() => {
    return data === null ? [] : formatMatchData(data);
  }, [data]);

  const fetchData = async () => {
    const url = UserBookItemUrlBuilder.getMatches(1, 50);

    return axios
      .get<MatchType>(url)
      .then((response) => response.data)
      .then(setData)
      .catch(console.log);
  };

  const onExchangeEvent = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View className="flex-1">
      <ListHeader text="Twoje matche z użytkownikami" />
      <View className="mt-2 flex-1">
        <VerticalList
          className="flex-1"
          onRefresh={fetchData}
          data={matchData}
          renderRow={(item) => (
            <MatchedBooksVerticalListRow
              match={item}
              onExchangeEvent={onExchangeEvent}
            />
          )}
        />
      </View>
    </View>
  );
}
