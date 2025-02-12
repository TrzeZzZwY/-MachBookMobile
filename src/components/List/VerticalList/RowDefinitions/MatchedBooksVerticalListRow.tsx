import { Portal } from "@gorhom/portal";
import React from "react";
import { View, Pressable, Text } from "react-native";
import ListActionButton from "../../ListActionButton";
import ListDeleteButton from "../../ListDeleteButton";
import ListImage from "../../ListImage";
import usePopup from "hooks/usePopup/usePopup";

export default function MatchedBooksVerticalListRow() {
  const [isOpen, open, close, Popup] = usePopup();

  return (
    <>
      <Portal>
        <Popup>
          <View className="mt-4">
            <View>
              <Text className="font-light text-xl"></Text>
              <Text className="font-light text-xs"></Text>
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
            <Pressable className="w-[47%] bg-red-500 flex items-center justify-center py-3 rounded-md">
              <Text className="font-bold text-white">Usuń</Text>
            </Pressable>
          </View>
        </Popup>
      </Portal>
      <View className="h-[82]">
        <View className="flex flex-row flex-1 justify-between mt-3">
          <View className="flex flex-row">
            {/* <ListImage source={assets[0].localUri!} /> */}

            <View className="flex justify-center ml-3 max-w-[200]">
              <View>
                <Text
                  className="font-roboto-light text-sm"
                  numberOfLines={2}
                ></Text>
              </View>
              <View>
                <Text
                  className="font-roboto-bold text-xs"
                  numberOfLines={1}
                ></Text>
              </View>
            </View>
          </View>
          <View className="w-[60] flex justify-around">
            {/* <ListActionButton
              action={editAction}
              backgroundColor={"#C6DFDE"}
              icon={<EditIcon fill={"#8EA8AA"} className="w-5 h-6" />}
            />
            <ListDeleteButton
              deleteAction={() => open("Usunąć książkę?")}
              color={"#C1C1C1"}
              backgroundColor={"#e5e5e5"}
            /> */}
          </View>
        </View>
      </View>
    </>
  );
}
