import { View, Text, Pressable } from "react-native";
import ListImage from "../../ListImage";
import { UserBookItemType } from "../../../../types/UserBookItemType";
import { useAssets } from "expo-asset";
import appConfig from "appConfig";
import { useContext, useMemo } from "react";
import ListActionButton from "../../ListActionButton";
import ListDeleteButton from "../../ListDeleteButton";
import EditIcon from "svg/edit.svg";
import { Portal } from "@gorhom/portal";
import usePopup from "hooks/usePopup/usePopup";
import UserBookItemService from "../../../../urlBuilders/UserBookItemUrlBuilder";
import UserBookContext from "../../../../contexts/UserBookContext/UserBookContext";
import useAxios from "hooks/useAxios";
import AuthContext from "../../../../contexts/AuthorizationContext/AuthContext";
import { Pagination } from "types/Pagination";

export type VerticalListRowProps = {
  data: UserBookItemType;
};

export default function CurrentBooksVerticalListRow({
  data,
}: VerticalListRowProps) {
  const axios = useAxios();
  const auth = useContext(AuthContext);

  const context = useContext(UserBookContext);
  const [isOpen, open, close, Popup] = usePopup();
  const [assets, error] = useAssets(
    require("../../../../../assets/images/template.png")
  );
  const authors = useMemo(
    () =>
      data.bookReference.authors
        .map((a) => `${a.firstName} ${a.lastName}`)
        .join(","),
    [data.bookReference.authors]
  );

  const imageUrl =
    appConfig.apiEndpoint + `/UserBookItem/image/${data.imageId}`;

  const onDelete = () => {
    var url = UserBookItemService.deleteUserBookItem(data.id);
    var booksUrl = UserBookItemService.getUserBooks(1, 10, auth.userId);

    axios
      .delete(url)
      .then(() => axios.get<Pagination<UserBookItemType>>(booksUrl))
      .then((response) => response.data)
      .then((data) => context.setData(data.items))
      .catch(console.log)
      .finally(close);
  };

  const editAction = () => {};

  if (assets === undefined) return null;

  return (
    <>
      <Portal>
        <Popup>
          <View className="mt-4">
            <View>
              <Text className="font-light text-xl">{data.description}</Text>
              <Text className="font-light text-xs">{authors}</Text>
            </View>
          </View>
          <View className="flex flex-row my-5 justify-center">
            <View className="h-[1] w-[80%]  bg-neutral-100" />
          </View>
          <View className="flex flex-row justify-between">
            <Pressable
              className="w-[47%] bg-neutral-900 flex items-center justify-center py-3 rounded-md"
              onPress={close}
            >
              <Text className="font-bold text-white">Anuluj</Text>
            </Pressable>
            <Pressable
              className="w-[47%] bg-red-500 flex items-center justify-center py-3 rounded-md"
              onPress={onDelete}
            >
              <Text className="font-bold text-white">Usuń</Text>
            </Pressable>
          </View>
        </Popup>
      </Portal>
      <View className="h-[82]">
        <View className="flex flex-row flex-1 justify-between mt-3">
          <View className="flex flex-row">
            {data.imageId === null ? (
              <ListImage source={assets[0].localUri!} />
            ) : (
              <ListImage source={assets[0].localUri!} src={imageUrl} />
            )}
            <View className="flex justify-center ml-3 max-w-[200]">
              <View>
                <Text className="font-roboto-light text-sm" numberOfLines={2}>
                  {data.description}
                </Text>
              </View>
              <View>
                <Text className="font-roboto-bold text-xs" numberOfLines={1}>
                  {authors}
                </Text>
              </View>
            </View>
          </View>
          <View className="w-[60] flex justify-around">
            <ListActionButton
              action={editAction}
              backgroundColor={"#C6DFDE"}
              icon={<EditIcon fill={"#8EA8AA"} className="w-5 h-6" />}
            />
            <ListDeleteButton
              deleteAction={() => open("Usunąć książkę?")}
              color={"#C1C1C1"}
              backgroundColor={"#e5e5e5"}
            />
          </View>
        </View>
      </View>
    </>
  );
}
