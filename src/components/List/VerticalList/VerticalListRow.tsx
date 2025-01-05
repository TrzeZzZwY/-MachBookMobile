import { View } from "react-native";
import VerticalListLeftSection from "./VerticalListLeftSection";
import VerticalListRightSection from "./VerticalListRightSection";
import VerticalListImage from "../ListImage";
import VerticalListRowText from "./VerticalListRowText";
import { UserBookItem } from "../../../types/UserBookItem";
import { useAssets } from "expo-asset";

export type VerticalListRowProps = {
  children: React.ReactElement | React.ReactElement[]
  data: UserBookItem; 
};

export default function VerticalListRow({ data, children }: VerticalListRowProps) {

  const [assets, error] = useAssets(
    require("../../../../assets/images/template.png")
  );

  const authors = data.bookReference.authors.map(a => `${a.firstName} ${a.lastName}`).join(',');

  if(assets === undefined)
    return null;

  return (
    <View>
      <View className="flex flex-row flex-1 justify-between mt-3">
        <VerticalListLeftSection>
          <VerticalListImage source={assets[0].localUri!}/>
          <VerticalListRowText header={data.description} subHeader={authors}/>
        </VerticalListLeftSection>
        <VerticalListRightSection>
          {children}
        </VerticalListRightSection>
      </View>
    </View>
  );
}
