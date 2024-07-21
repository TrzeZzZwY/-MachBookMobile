import { View } from "react-native";
import { BookListRowEntry } from "./VerticalList";
import VerticalListLeftSection from "./VerticalListLeftSection";
import VerticalListRightSection from "./VerticalListRightSection";
import VerticalListImage from "../ListImage";
import VerticalListRowText from "./VerticalListRowText";

export type VerticalListRowProps = {
  children: React.ReactElement | React.ReactElement[]
  data: BookListRowEntry;
};

export default function VerticalListRow({ data, children }: VerticalListRowProps) {

  return (
    <View>
      <View className="flex flex-row flex-1 justify-between mt-3">
        <VerticalListLeftSection>
          <VerticalListImage source={data.image.localUri!}/>
          <VerticalListRowText header={data.title} subHeader={data.author}/>
        </VerticalListLeftSection>
        <VerticalListRightSection>
          {children}
        </VerticalListRightSection>
      </View>
    </View>
  );
}
