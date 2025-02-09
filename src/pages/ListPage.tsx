import { View } from "react-native";
import MatchedBooksVerticalList from "../components/MatchedBooksVerticalList";
import CurrentBooksVerticalList from "../components/CurrentBooksVerticatList";
import BooksMatchedByOthersUsersList from "../components/BooksMatchedByOtherUsersList";

export default function ListPage() {
  return (
    <View className="flex-1">
      <BooksMatchedByOthersUsersList />
      <View className="flex-1 mx-4">
        <CurrentBooksVerticalList />
      </View>
    </View>
  );
}
