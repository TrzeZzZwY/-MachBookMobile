import { View, Text, TextInput, Pressable } from "react-native";
import SectionDivider from "../Common/SectionDivider";
import { useState } from "react";

export type ReportProps = {
  onReportSubmit: (description: string) => void;
};

export default function ReportPopup({ onReportSubmit }: ReportProps) {
  const [description, setDescription] = useState<string>("");

  return (
    <>
      <View className="mt-4">
        <Text className="text-xs mb-1 color-neutral-300">
          Dodatkowe informacje
        </Text>
        <TextInput
          onChangeText={(value) => setDescription(value)}
          numberOfLines={5}
          className="bg-neutral-100 rounded-md"
        />
      </View>
      <SectionDivider className="my-3" />
      <Pressable
        onPress={() => onReportSubmit(description)}
        className="bg-neutral-900 rounded-md py-3"
      >
        <Text className="text-center color-white font-bold">Wyślij</Text>
      </Pressable>
    </>
  );
}
