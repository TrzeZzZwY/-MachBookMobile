import { useEffect, useState } from "react";
import VerticalList from "./List/VerticalList/VerticalList";
import ListActionButton from "./List/ListActionButton";
import ListDeleteButton from "./List/ListDeleteButton";
import Svg, { NumberProp, Path } from "react-native-svg";
import { ColorValue } from "react-native";
import axiosInstance from "../axios/axiosInstance";
import { Pagination } from "../types/Pagination";
import { UserBookItem } from "../types/UserBookItem";
import BookService from "../services/BookService";
import UserBookItemService from "../services/UserBookItemService";

export default function CurrentBooksVerticalList() {
  const [data, setData] = useState<UserBookItem[]>([]);

  const deleteAction = () => {};

  const editAction = () => {};

  useEffect(() => {
    (async () => {
      const data = await UserBookItemService.GetUserBooks(1,50);
      if(data)
        setData(data.items);   
    })()
    }, []);

  return (
    <VerticalList data={data} header="Twoje aktualne książki">
      <ListActionButton
        action={editAction}
        backgroundColor={"#C6DFDE"}
        icon={<EditIcon color={"#8EA8AA"} size={22} />}
      />
      <ListDeleteButton
        deleteAction={deleteAction}
        color={"#C1C1C1"}
        backgroundColor={"#F3F3F3"}
      />
    </VerticalList>
  );
}

export const EditIcon = ({ color, size }: { color: ColorValue, size: NumberProp }) => {

  const height = size as number + 6;

  return (
    <Svg viewBox="0 0 512 512" width={size} height={height} fill={color}>
      <Path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
    </Svg>
  );
};
