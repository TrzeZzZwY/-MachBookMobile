import { View, Image } from "react-native";
import HorizontalListItem from "./HorizontalListItem";

export type HorizontalListItemBadgeProps = {
    source: string
}

export default function HorizontalListItemBadge({source} : HorizontalListItemBadgeProps) {
    return (
        <View className="overflow-hidden rounded-md border-black border-2">
            <Image source={{uri: source}} style={{height: 25, width: 25}}/>
        </View>
    )
}