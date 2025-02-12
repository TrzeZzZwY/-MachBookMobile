import { Pressable, View, Text } from "react-native";
import CurrentBooksVerticalList from "../components/CurrentBooksVerticatList";
import BooksLiked from "../components/BooksLiked";
import SectionDivider from "../components/Common/SectionDivider";
import Book from "svg/book.svg";
import HearthFull from "svg/hearthFull.svg";
import { useState } from "react";
import MatchedBooksVerticalList from "../components/MatchedBooksVerticalList";

enum PageType {
  CURRENT_BOOKS_LIST,
  MATCHES_LIST,
}

export default function ListPage() {
  const [currentPage, setCurrentPage] = useState<PageType>(
    PageType.CURRENT_BOOKS_LIST
  );

  const pageMode = PageType.CURRENT_BOOKS_LIST;

  const pageTypeResolver = (pageType: PageType) => {
    switch (pageType) {
      case PageType.CURRENT_BOOKS_LIST:
        return (
          <View className="flex-1 mx-4">
            <CurrentBooksVerticalList />
          </View>
        );
      case PageType.MATCHES_LIST:
        return (
          <View className="flex-1 mx-4">
            <MatchedBooksVerticalList />
          </View>
        );
    }
  };

  return (
    <View className="flex-1">
      <BooksLiked />
      <View className="flex flex-row justify-between w-full">
        <Pressable
          onPress={() => setCurrentPage(PageType.CURRENT_BOOKS_LIST)}
          className="rounded-md bg-neutral-900 ml-4 mr-2 h-10 flex-1"
        >
          <View className="flex-1 flex items-center justify-center">
            <View className="flex-row items-center flex-1 w-full justify-between px-4">
              <Text className="font-bold mr-2 color-white">Twoje książki</Text>
              <Book height={15} width={15} fill={"#FFFFFF"} />
            </View>
          </View>
        </Pressable>
        <Pressable
          onPress={() => setCurrentPage(PageType.MATCHES_LIST)}
          className="rounded-md bg-neutral-900 mr-4 ml-2 h-10 flex-1"
        >
          <View className="flex-1 flex items-center justify-center">
            <View className="flex-row items-center flex-1 w-full justify-between px-4">
              <Text className="font-bold mr-2 color-white">Twoje matche</Text>
              <HearthFull height={15} width={15} fill={"#FFFFFF"} />
            </View>
          </View>
        </Pressable>
      </View>
      {pageTypeResolver(currentPage)}
    </View>
  );
}
