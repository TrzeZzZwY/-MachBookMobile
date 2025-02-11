import { View } from "react-native";
import MatchedBooksVerticalList from "../components/MatchedBooksVerticalList";
import CurrentBooksVerticalList from "../components/CurrentBooksVerticatList";
import BooksLiked from "../components/BooksLiked";

export default function ListPage() {
  return (
    <View className="flex-1">
      <BooksLiked />
      <View className="flex-1 mx-4">
        <CurrentBooksVerticalList />
      </View>
    </View>
  );
}
