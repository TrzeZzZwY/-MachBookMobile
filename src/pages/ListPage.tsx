import { View } from "react-native";
import MatchedBooksVerticalList from "../components/MatchedBooksVerticalList";
import CurrentBooksVerticalList from "../components/CurrentBooksVerticatList";
import BooksMatchedByOthersUsersList from "../components/BooksMatchedByOtherUsersList";

export default function ListPage() {
  return (
    <View>
      <View>
        <BooksMatchedByOthersUsersList />
        <View className="mx-5">
          <MatchedBooksVerticalList />
          <CurrentBooksVerticalList />
        </View>
      </View>
    </View>
  );
}
