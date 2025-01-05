import { View } from "react-native";

type ActionSectionWrapperProps = {
    children: React.ReactElement
}

export default  function ActionSectionWrapper({children}: ActionSectionWrapperProps) {
    return (
        <View>
            {children}
        </View>
    )
} 