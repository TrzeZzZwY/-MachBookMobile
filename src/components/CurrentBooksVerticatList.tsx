import VerticalList from "./List/VerticalList/VerticalList";
import ListActionButton from "./List/ListActionButton";
import ListDeleteButton from "./List/ListDeleteButton";
import Svg, { NumberProp, Path } from "react-native-svg";
import { ColorValue, TextInput, View, Text } from "react-native";
import ListHeader from "./List/ListHeader";
import { useContext, useEffect, useState } from "react";
import UserBookContext from "../contexts/UserBookContext/UserBookContext";
import UserBookItemService from "services/UserBookItemService";
import MagnifyingGlass from "svg/magnifying-glass.svg";
import usePopup from "hooks/usePopup/usePopup";
import { Portal } from "@gorhom/portal";
import CurrentBooksVerticalListRow from "./List/VerticalList/RowDefinitions/CurrentBooksVerticalListRow";

export default function CurrentBooksVerticalList() {

  const context = useContext(UserBookContext);
  const [inputTimeout, setInputTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const onRefresh = () => {
    return UserBookItemService
      .getUserBooks(1, 10)
      .then(result => result.items)
      .then(context.setData)
      .catch(console.log)
  }

  const onInput = (text: string) => {

    const INPUT_TIMEOUT = 500;

    if (inputTimeout !== null)
      clearTimeout(inputTimeout);

    const timeout = setTimeout(() => {
      UserBookItemService
        .searchItems(text)
        .then(context.setData)
    }, INPUT_TIMEOUT)

    setInputTimeout(timeout);

  }

  useEffect(() => {
    UserBookItemService
      .getUserBooks(1, 10)
      .then(result => result.items)
      .then(context.setData)
      .catch(console.log)
  }, [])


  return (
    <>
      <ListHeader text="Twoje aktualne książki" />
      <View className="my-2">
        <TextInput className="bg-neutral-200 px-10 py-1 rounded-md w-full" onChangeText={onInput} />
        <MagnifyingGlass className="w-4 h-4 absolute top-[30%] left-[10]" fill={"#a1a1a1"} />
      </View>
      <VerticalList 
        className="h-[63vh]"
        data={context.data} 
        onRefresh={onRefresh} 
        renderRow={(item) => <CurrentBooksVerticalListRow data={item} />} 
        />
    </>

  );
}

