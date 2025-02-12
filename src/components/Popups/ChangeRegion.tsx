import { Pressable, View, Text } from "react-native";
import RegionPicker, {
  RegionFactory,
  RegionType,
} from "../Common/RegionPicker";
import { useContext, useEffect, useState } from "react";
import SectionDivider from "../Common/SectionDivider";
import useAxios from "hooks/useAxios";
import AccountUrlBuilder from "services/AccountUrlBuilder";
import appConfig from "appConfig";

export type ChangeRegionProps = {
  onRegionChange: () => void;
  currentRegionId: number;
};

export default function ChangeRegion({
  currentRegionId,
  onRegionChange,
}: ChangeRegionProps) {
  const axios = useAxios();
  const [region, setRegion] = useState<RegionType>(
    RegionFactory(currentRegionId)
  );

  const handleRegionChange = () => {
    const url = `${
      appConfig.apiAuthEndpoint
    }/${AccountUrlBuilder.changeRegion()}`;

    axios({
      url: url,
      method: "PUT",
      data: {
        region: region.id,
      },
    })
      .catch(console.log)
      .finally(onRegionChange);
  };

  return (
    <View>
      <RegionPicker label="Region" onChange={setRegion} currentValue={region} />
      <SectionDivider className="my-4 w-[80%]" />
      <View>
        <Pressable
          onPress={handleRegionChange}
          className="flex items-center justify-center bg-neutral-900 h-10 rounded-md"
        >
          <Text className="text-white font-bold">Zastosuj</Text>
        </Pressable>
      </View>
    </View>
  );
}
