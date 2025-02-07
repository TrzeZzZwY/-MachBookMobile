import VerticalList from "./List/VerticalList/VerticalList";
import ListActionButton from "./List/ListActionButton";
import ListDeleteButton from "./List/ListDeleteButton";
import Svg, { NumberProp, Path } from "react-native-svg";
import { ColorValue, TextInput, View, Text } from "react-native";
import ListHeader from "./List/ListHeader";
import { useContext, useEffect, useState } from "react";
import UserBookContext from "../contexts/UserBookContext/UserBookContext";
import UserBookItemService from "../urlBuilders/UserBookItemUrlBuilder";
import MagnifyingGlass from "svg/magnifying-glass.svg";
import usePopup from "hooks/usePopup/usePopup";
import { Portal } from "@gorhom/portal";
import CurrentBooksVerticalListRow from "./List/VerticalList/RowDefinitions/CurrentBooksVerticalListRow";
import useAxios from "hooks/useAxios";
import UserBookItemUrlBuilder from "../urlBuilders/UserBookItemUrlBuilder";
import { Pagination } from "types/Pagination";
import { UserBookItemType } from "types/UserBookItemType";
import AuthContext from "../contexts/AuthorizationContext/AuthContext";

export default function CurrentBooksVerticalList() {

  const auth = useContext(AuthContext);
  const context = useContext(UserBookContext);
  const axios = useAxios();
  const [inputTimeout, setInputTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const url = UserBookItemUrlBuilder.getUserBooks(1,10,auth.userId, true);
    axios.get<Pagination<UserBookItemType>>(url)
      .then(result => result.data)
      .then(result => result.items)
      .then(context.setData)
      .catch(console.log)
  }, [])

  const onRefresh = () => {
    const url = UserBookItemUrlBuilder.getUserBooks(1,10,auth.userId, true);
    return axios.get<Pagination<UserBookItemType>>(url)
      .then(result => result.data)
      .then(result => result.items)
      .then(context.setData)
      .catch(console.log)
  }

  const onInput = (text: string) => {

    const INPUT_TIMEOUT = 500;

    if (inputTimeout !== null)
      clearTimeout(inputTimeout);

    const timeout = setTimeout(() => {
      const url = UserBookItemUrlBuilder.searchItems(text);

      axios.get<Pagination<UserBookItemType>>(url)
        .then(response => response.data)
        .then(response => response.items)
        .then(context.setData)
    }, INPUT_TIMEOUT)

    setInputTimeout(timeout);

  }

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

