import React from "react";
import { View, Pressable, Text, Image } from "react-native";
import usePopup from "hooks/usePopup/usePopup";
import { MatchRowType } from "../../../MatchedBooksVerticalList";
import ImageUrlBuiler from "services/ImageUrlBuilder";
import Exchange from "svg/exchange.svg";
import SectionDivider from "../../../Common/SectionDivider";
import useAxios from "hooks/useAxios";
import ExchangeUrlBuilder from "services/ExchangeUrlBuilder";

export function exchangeStatusMapper(statusId: number): string {
  switch (statusId) {
    case 0:
      return "Oczekuje";
    case 1:
      return "Zaakceptowany";
    case 2:
      return "Odrzucony";
    case 3:
      return "Anulowany";
    default:
      return "-";
  }
}

export type MatchedBooksVerticalListRowProps = {
  onExchangeEvent: () => void;
  match: MatchRowType;
};

export default function MatchedBooksVerticalListRow({
  match,
  onExchangeEvent,
}: MatchedBooksVerticalListRowProps) {
  const axios = useAxios();
  const [isOpen, open, close, Popup] = usePopup();

  const offeredBookImageUrl = ImageUrlBuiler.getUserBookItemImage(
    match.offeredBook.imageId
  );
  const requestedBookImageUrl = ImageUrlBuiler.getUserBookItemImage(
    match.requestedBook.imageId
  );

  const handleExchange = (id: number | null, accept: boolean) => {
    if (id === null) return;

    const url = ExchangeUrlBuilder.exchangeBook();

    axios
      .put(url, {
        exchangeId: id,
        accepted: accept,
      })
      .then(() => onExchangeEvent())
      .catch(console.log);
  };

  const handleExchangeStart = () => {
    const url = ExchangeUrlBuilder.exchangeBook();

    axios
      .post(url, {
        initiatorBookItemId: match.offeredBook.userBookItemId,
        receiverUserId: match.user.id,
        receiverBookItemId: match.requestedBook.userBookItemId,
      })
      .then(() => onExchangeEvent())
      .catch(console.log);
  };

  console.log(match);

  return (
    <>
      <View className="bg-neutral-200 rounded-md mb-3 p-4">
        <View className="mb-4">
          <View className="flex flex-row">
            <Image
              className="rounded-md mr-4"
              source={{ uri: offeredBookImageUrl }}
              height={50}
              width={50}
            />
            <View className="flex-1">
              <Text className="font-merriweather">
                {match.offeredBook.title}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex flex-row items-center">
          <View className="h-[1] flex-1 bg-neutral-300"></View>
          <View className="mx-4 flex-row items-center bg-neutral-900 py-1 px-3 rounded-sm">
            <Text className="text-xs color-white font-bold">
              Twoja książka za
            </Text>
            <Exchange className="h-3 w-3 rotate-90 ml-2" fill={"white"} />
          </View>
          <View className="h-[1] flex-1 bg-neutral-300"></View>
        </View>
        <View className="mt-4">
          <View className="flex flex-row">
            <Image
              className="rounded-md mr-4"
              source={{ uri: requestedBookImageUrl }}
              height={50}
              width={50}
            />
            <View className="flex-1">
              <Text className="font-merriweather h-[35]" numberOfLines={2}>
                {match.offeredBook.title}
              </Text>
              <Text className="text-xs color-neutral-400">
                Użytkownika:{" "}
                <Text className="font-bold color-neutral-900">
                  {match.user.firstName}
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <SectionDivider className="bg-neutral-300 mt-5 mb-5" />
        <View className="flex flex-row">
          {match.isMyOffer === null ? (
            <Pressable
              className="flex-1 bg-neutral-900 py-2 rounded-md mr-1"
              onPress={handleExchangeStart}
            >
              <Text className="text-white font-bold text-center">Wymień</Text>
            </Pressable>
          ) : match.isMyOffer === false ? (
            <>
              <Pressable
                onPress={() => handleExchange(match.exchangeId, true)}
                className="flex-1 bg-neutral-900 py-2 rounded-md mr-1"
              >
                <Text className="text-white font-bold text-center">
                  Zaakceptuj
                </Text>
              </Pressable>
              <Pressable
                onPress={() => handleExchange(match.exchangeId, false)}
                className="flex-1 bg-red-500 py-2 rounded-md ml-1"
              >
                <Text className="text-white font-bold text-center">Odrzuć</Text>
              </Pressable>
            </>
          ) : (
            <View>
              <Text>{exchangeStatusMapper(match.exchangeStatus ?? 100)}</Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
}
